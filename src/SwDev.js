export default function swDev(){
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    console.log(swUrl,'url')
    console.log(window.isSecureContext,'connection')
    if ('serviceWorker' in navigator) {
        console.log("hi")
        navigator.serviceWorker.register(swUrl).then((res) => {
            console.log(res,'ress')
            // if(res.installing == null){
            //     console.log("sidebar",document.getElementsByClassName("sidebar"))
            // } 
        })
    }
}
