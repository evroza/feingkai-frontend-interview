import { ConfigModel } from '../core/interfaces/config';

export class PagesConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			'/': {
				page: {
					title: 'Dashboard',
					desc: 'Latest updates and statistic charts'
				}
			},
			'feingkai': { // <= add page URL
				page: { title: 'Feingkai Exchange', desc: 'The best Crypto Exchange in the world' } // <= Page name and description
			},
			// 'feingkai/login': { // <= add page URL
			// 	page: { title: 'Feingkai Exchange Login', desc: 'The best Crypto Exchange in the world' } // <= Page name and description
			// },
			builder: {
				page: { title: 'Layout Builder', desc: 'Layout builder' }
			},
			header: {
				actions: {
					page: { title: 'Actions', desc: 'actions example page' }
				}
			},
			profile: {
				page: { title: 'User Profile', desc: '' }
			},
			404: {
				page: { title: '404 Not Found', desc: '', subheader: false }
			}
		};
	}
}
