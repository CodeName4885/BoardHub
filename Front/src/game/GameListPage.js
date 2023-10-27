import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { GameListComponent } from "./GameListComponent";

export function GameListPage() {
    return (
        <>
            <Header />

            <GameListComponent />

            <Footer />
        </>
    );
}
