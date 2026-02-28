import LastFive from "../features/themes/themes/LastFive";
import News from "../aside/News";

export default function Home() {
    return (
        <>
            <main>
                <LastFive />
            </main>
            <aside>
                <News />
            </aside>
        </>
    );
}
