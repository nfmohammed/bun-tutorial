import figlet from "figlet"

const server = Bun.serve({
    port: 3000,
    fetch(request) {
        const url = new URL(request.url)
        if (url.pathname === "/") {
            const body = figlet.textSync("Fun Bun")
            return new Response(body)
        }
        if (url.pathname === "/about"){
            return new Response("About me!")
        }
        if (url.pathname === "/greet"){
            return new Response(Bun.file('./greet.txt'))
        }
        if (url.pathname === "/error"){
            return new Error("Application encountered an error")
        }

        return new Response("404!")
    },
    error(error) {
        return new Response(`<pre> ${error} \n ${error.stack} </pre>`, {
            headers: { 'Content-Type': 'text/html'}
        })
    }
})
console.log(`Server started on http://localhost:${server.port}`)