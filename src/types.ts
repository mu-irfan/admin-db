interface FacilitiesFilterOptionProps {
  id: string;
  label: string;
  onChange: (id: string, isChecked: boolean) => void;
  isChecked: boolean;
}

interface Land {
  uid: string;
  estate: string;
  tehsil: string;
  district: string;
  province: string;
  size_acre: number;
  estate_asking_price: number;
  [key: string]: any;
}

interface LandsProps {
  onSeeMoreDetails: (uid: string) => void;
  lands: Land[];
}

interface ForecastData {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  windspeedMax: number;
  etoFao: number;
  shortwaveRadiationSum: number;
  precipitationSum: number;
  relativeHumidity: number;
}

interface WeatherChartProps {
  forecastData: ForecastData[];
}

interface TemperatureData {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
}

interface TemperatureChartProps {
  data: TemperatureData[];
  onMonthClick: (monthYear: string) => void;
}

interface createAccountPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

type ForgotPasswordFormValues =
  | { email: string }
  | { email: string; otp: string }
  | { email: string; newPassword: string; confirmPassword: string };

interface FarmRequestPayload {
  farm_id: string;
  contractor_id: string;
  start_date: string;
  end_date: string;
}

interface Option {
  value: string;
  label: string;
}

type PakistanData = {
  provinces: { label: string; value: string }[];
  [key: string]: { label: string; value: string }[];
};
