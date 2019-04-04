export interface Currencies {
    id: string,
    symbol: string,
    explorer_transaction?: string,
    explorer_address?: string,
    type: string,
    deposit_fee: number,
    withdraw_fee: number,
    quick_withdraw_limit: number,
    base_factor: number,
    precision: number,
    icon_url: string
}