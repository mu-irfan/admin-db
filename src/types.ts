interface Project {
  uid: string;
  estate: string;
  tehsil: string;
  district: string;
  province: string;
  size_acre: number;
  estate_asking_price: number;
  [key: string]: any;
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

type PakistanData = {
  provinces: { label: string; value: string }[];
  [key: string]: { label: string; value: string }[];
};

interface Option {
  value: string;
  label: string;
}
interface ApplicationData {
  uuid: string;
  studentUuid: string;
  projectUuid: string;
  reviewedByUuid: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  project: ProjectData;
}

interface ProjectData {
  uuid: string;
  createdByUuid: string;
  creatorType: string;
  title: string;
  trade: string;
  sector: string;
  description: string;
  requirements: string;
  address: string;
  tehsil: string;
  district: string;
  province: string;
  duration: string;
  startDate: string;
  endDate: string;
  deadline: string;
  totalSlots: number;
  slotsFilled: number;
  status: string;
  admin?: any;
  employer?: {
    uuid: string;
    name: string;
    email: string;
    organization: string;
    industry: string;
    phone: string;
  } | null;
}
