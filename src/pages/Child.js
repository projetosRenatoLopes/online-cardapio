import { useParams } from "react-router-dom";

export function Child() {
    let { id } = useParams();
    sessionStorage.setItem('company', JSON.stringify(id))
}

