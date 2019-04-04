#!/bin/bash


if [ $# -lt 1 ]; then
    echo "Error: This command must receive at least one argument! Usage: ./release.sh [action] \n
Possible actions: upgrade force install delete purge push push-new force-push get_name"
    exit 1
fi

# Add all .env files variables to environment
set -a
. ./.env
set +a

# Allow get_name command output only the name
if [ $1 = "get_name" ]; then
    kubectl get pods -n $NAMESPACE -l app=$RELEASE_NAME -o jsonpath="{.items[0].metadata.name}"
    echo ""
    exit 0
fi

echo "Repo name: $REPO_NAME"
echo "Release name: $RELEASE_NAME"
echo "Namespace: $NAMESPACE"
echo "Chart path: $CHART_PATH"

echo "Setting correct values file based on current Cluster context..."
cluster_context=$(kubectl config current-context)
if [ $cluster_context = "feingkai-dev" ] || [ $cluster_context = "greentier" ] ; then
    if [ -e ./helm/values-aws.yaml ]; then
        VALUES=./helm/values-aws.yaml
    else
        VALUES=./helm/values-dev.yaml
    fi
fi

echo "Values path: $VALUES"
echo "Tiller Namespace: $TILLER_NAMESPACE"


if [ -f $VALUES ] && [ ! -z $VALUES ]; then
   echo "Values file: $VALUES exists."
   VALUES_FILE_STRING="--values=$VALUES"
else
   echo "Values file was not specified or does not exist."
   VALUES_FILE_STRING=""
fi

if [ $1 = "upgrade" ]; then
    echo "Upgrading Chart..."
    helm upgrade -i $VALUES_FILE_STRING $RELEASE_NAME --namespace $NAMESPACE --tiller-namespace $TILLER_NAMESPACE  $CHART_PATH
elif [ $1 = "force" ]; then
    echo "Installing Chart by force..."
    helm install --replace $VALUES_FILE_STRING -n $RELEASE_NAME --namespace $NAMESPACE  --tiller-namespace $TILLER_NAMESPACE  $CHART_PATH
elif [ $1 = "install" ]; then
    echo "Installing Chart..."
    helm install $VALUES_FILE_STRING -n $RELEASE_NAME --namespace $NAMESPACE  --tiller-namespace $TILLER_NAMESPACE  $CHART_PATH
elif [ $1 = "delete" ]; then
    echo "Deleting Chart..."
    helm delete $RELEASE_NAME --tiller-namespace $TILLER_NAMESPACE
elif [ $1 = "purge" ]; then
    echo "Deleting and purging Chart..."
    helm delete --purge $RELEASE_NAME --tiller-namespace $TILLER_NAMESPACE
elif [ $1 = "template" ]; then
    echo "Outputting full Chart processed configuration..."
    helm template $VALUES_FILE_STRING --name $RELEASE_NAME $CHART_PATH
elif [ $1 = "logs" ]; then
    echo "Outputting pod logs..."
    kubectl -n $NAMESPACE logs -f $(release.sh get_name)
elif [ $1 = "exec" ]; then
    echo "Getting pod name and connecting to /bin/bash..."
    echo "To change shell type pass its path as second argument e.g. release.sh exec /bin/sh"
    remote_shell=/bin/bash
    if [ ! -z "$2" ]; then
        remote_shell=$2
    fi
    kubectl -n $NAMESPACE exec -it $(release.sh get_name) $remote_shell
elif [ $1 = "push" ]; then
    if [ $# -lt 2 ]; then
        echo "Error: This command must receive a commit message as a second argument! Usage: ./release.sh [action] [commit message]"
        exit 1
    fi
    echo "Committing and pushing to repo..."
    git commit -am "$2" && git push

elif [ $1 = "push-new" ]; then
    if [ $# -lt 2 ]; then
        echo "Error: This command must receive a commit message as a second argument! Usage: ./release.sh [action] [commit message]"
        exit 1
    fi
    echo "Adding untracked files..."
    git add . 
    echo "Committing and pushing to repo..."
    git commit -am "$2" && git push

elif [ $1 = "force-push" ]; then
    if [ $# -lt 2 ]; then
        echo "Error: This command must receive a commit message as a second argument! Usage: ./release.sh [action] [commit message]"
        exit 1
    fi
    echo "Updating deploy key..."
    HASH=`date | md5sum - | awk '{print $1}'`
    DEPLOY_KEY=${HASH:0:6}
    rm -f ./.deploy-*
    touch ./.deploy-$DEPLOY_KEY
    git add ./.deploy-*
    
    echo "Committing and pushing to repo..."
    git commit -am "$2" && git push

elif [ $1 = "commit" ]; then
    if [ $# -lt 2 ]; then
        echo "Error: This command must receive a commit message as a second argument! Usage: ./release.sh [action] [commit message]"
        exit 1
    fi

    echo "Committing  repo..."
    git commit -am "$2"
else
    echo "Error: action parameter is not recognized!"
    exit 1
fi
