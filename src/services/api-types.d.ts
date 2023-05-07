export interface Project {
  city: string | null;
  client: string | null;
  created_at: string | null;
  end_date: string | null;
  id: { $oid: string };
  name: string | null;
  start_date: string | null;
  status: string | null;
  street: string | null;
  updated_at: string | null;
  zipcode: string | null;
  _id: { $oid: string };
}
