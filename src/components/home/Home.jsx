import Themes from "../themes/themes/Themes";
import News from "../aside/News";

export default function Home() {
    return (
        <>
            <main>
                <Themes />
            </main>
            <aside>
                <News />
            </aside>
        </>
    );
}
