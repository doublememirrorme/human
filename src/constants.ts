export const API_URL = 'https://react-challenge.human.hr'

type ValidCategoryIds = '1' | '2' | '3' | '4';
type CategoryId = {
  [K in ValidCategoryIds]: string;
} & {
  [index: string]: string;
}

export const CATEGORIES: CategoryId = {
  '1': 'X Universe',
  '2': 'Elite: Dangerous',
  '3': 'Starpoint Gemini',
  '4': 'EVE Online',
}