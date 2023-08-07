function copyCode() {
    const codeBlock = document.getElementById("codeBlock");
    const codeText = codeBlock.innerText;

    const textArea = document.createElement("textarea");
    textArea.value = codeText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    const tooltipText = document.getElementById("tooltipText");
    tooltipText.style.visibility = "visible";

    setTimeout(() => {
        tooltipText.style.visibility = "hidden";
    }, 1000);
}