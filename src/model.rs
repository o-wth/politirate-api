pub struct Politician {
  pub firstName: String,
  pub lastName: String,
  pub fullName, String,
  pub phoneNumber: String,
  pub party: String
}

impl Politician {
  pub fn firstName(&self) -> String {
    self.firstName
  }
  pub fn lastName(&self) -> String {
    self.lastName
  }
  pub fn fullName(&self) -> String {
    self.fullName
  }
  pub fn phoneNumber(&self) -> String {
    self.phoneNumber
  }
  pub fn party(&self) -> String {
    self.party
  }
}