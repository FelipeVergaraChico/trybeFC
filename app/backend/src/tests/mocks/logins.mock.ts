const Email = "user@user.com"
const IEmail = "@user.com"
const Password = "secret_admin"
const IPasswordTamanho = "oi"
const IPasswordLogin = "senhaInvalida"

export const EmailInvalid = {
  email: IEmail,
  password: Password
}

export const InvalidPasswordL = {
  email: Email,
  password: IPasswordTamanho
}

export const InvalidPassword = {
  email: Email,
  password: IPasswordLogin
}

export const login = {
  email: Email,
  password: Password
}

export const SemEmail = {
  password: Password
}

export const SemPassword = {
  email: Email
}

export const loginModel = {
  id: 1,
  username: "user",
  role: "admin",
  email: Email,
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

export const mensagemInvalida = { message: 'Invalid email or password' }
export const mensagemMiddleware = { message: 'All fields must be filled' }
