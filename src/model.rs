pub struct Politician {
  pub name, String,
  pub phoneNumber: String,
  pub party: String
}

impl Politician {
  pub fn name(&self) -> String {
    self.name
  }
  pub fn phoneNumber(&self) -> String {
    self.phoneNumber
  }
  pub fn party(&self) -> String {
    self.party
  }
}
