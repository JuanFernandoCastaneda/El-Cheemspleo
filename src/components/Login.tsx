export default function Login() {

    let params = new URLSearchParams(document.location.search);
    let name = params.get("query"); // is the string "Jonathan"
    let age = parseInt(params.get("corazon") || "10"); // is the number 18

    console.log(name, age)
    return <p>hola</p>
}