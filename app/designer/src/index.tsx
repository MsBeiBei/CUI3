import { createRoot } from "react-dom/client"
import CookieWarning from '@/components/CookieWarning'


async function setupApp() {
    const app = createRoot(document.getElementById("root")!!)

    app.render(
        navigator.cookieEnabled ? (
            <div>22</div>
        ) : (
            <CookieWarning />
        )
    )
}

setupApp()