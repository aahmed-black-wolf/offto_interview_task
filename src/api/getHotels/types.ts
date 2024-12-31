export interface IHotelRequestBody {
  DestinationCity: string;
  CheckInDate: string;
  CheckOutDate: string;
  CountryofResidence: string;
  CountryOfNationality: string;
  Room: { [key: string]: number }[];
  currencyCode: string;
  locale: string;
}
