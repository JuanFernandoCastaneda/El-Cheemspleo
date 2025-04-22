import LocalizedStrings from "react-localization";

type NeededThingies = {
  home: string;
  catchPhrase: string;
  searchInstruction: string;
  logIn: string;
  signOut: string;
  profile: string;
  profileFirstName: string;
  profileLastName: string;
  profileInfo: string;
  update: string;
  profileSessionError: string;
};

export const localization = new LocalizedStrings<NeededThingies>({
  en: {
    home: "Home",
    catchPhrase: "Find your dream job",
    searchInstruction: "Search for keywords",
    logIn: "Log in",
    signOut: "Sign out",
    profile: "Profile",
    profileFirstName: "First name",
    profileLastName: "Last name",
    profileInfo: "Profile information",
    update: "Update",
    profileSessionError: "Trying to access profile without session",
  },
  es: {
    home: "Inicio",
    catchPhrase: "Encuentra el empleo de tus sueños",
    searchInstruction: "Busca palabras claves",
    logIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    profile: "Perfil",
    profileFirstName: "Nombres",
    profileLastName: "Apellidos",
    profileInfo: "Información del perfil",
    update: "Actualizar",
    profileSessionError: "Intentando acceder a perfil sin sesión activa",
  },
});
