import { FC } from "react";

interface Props {
    name: string;
    phone: string;
    city: string;
    colleagues: string[];
}

const HomePage: FC<Props> = (props) => {
    const { name, phone, city, colleagues } = props;

    return (
        <div>
            <p className="font-bold">This is Home Page from Client Site</p>

            <h1 className="text-green-500">Hi, My name is {name}</h1>
            <div>Here is my phone number : {phone}</div>
            <p>I live in {city}</p>
            <p>Here is my colleague</p>
            <ul>
                {colleagues?.map((colleague) => (
                    <li key={colleague}>{colleague}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
