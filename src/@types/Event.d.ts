// export interface Event {
//   id: number;
//   name: string;
//   status: boolean;
//   owner_id: number;
//   eventId: number;
//   description: string;
//   picture: string;
//   password: string;
//   theme: string;
//   created_at: string;
//   updated_at: string;
// }

export interface Event {
  eventId: number;
  id: number;
  name: string;
  owner_id: number;
  status: boolean;
  description: string;
  picture: string;
  theme: string;
  password: string;
  dates_of_event: DateEvent[];
  users: UserEvent[];
  created_at: string;
  updated_at: string;
}

export interface DateEvent {
  end_date: string;
  start_date: string;
}

export interface UserEvent {
  user_id: number;
  user_choices: UserChoice[];
  user_information: UserInformation;
}

export interface UserChoice {
  id: number;
  user_id: number;
  end_date_choice: string;
  start_date_choice: string;
}

export interface UserInformation {
  user_lastname: string;
  user_firstname: string;
  profile_picture: string;
}
