const cancelBtn = document.querySelector(".btn");
const images = document.querySelectorAll(".photo");
const fullScreen = document.querySelector(".full");
const fullImg = document.querySelector(".fullImage");
const image = document.getElementById("fullScreenImage");
const container = document.querySelector(".photos");
const notFound = document.querySelector(".notFound");

// Fullscreen image logic
images.forEach(img => {
    img.addEventListener('click', () => {
    const innerImage = img.querySelector("img");
    fullScreen.style.display = "block";
    image.src = innerImage.src;
    image.alt = innerImage.alt;
    });
});

cancelBtn.addEventListener('click', () => {
    fullScreen.style.display = "none";
});

fullScreen.addEventListener('click', () => {
    fullScreen.style.display = "none";
});

fullImg.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Search logic
const searchBox = document.getElementById("search");

searchBox.addEventListener("input", () => {
    const term = searchBox.value.trim().toLowerCase();
    let found = 0;

    images.forEach(item => {
    const img = item.querySelector("img");
    const altText = img.alt.toLowerCase();
    const match = altText.includes(term);

    if (match || term === "") {
        item.style.display = "";
        found++;
    } else {
        item.style.display = "none";
    }
    });

    if (term === "") {
    // Restore original layout when search box is blank
    document.querySelectorAll('.photos > div:nth-child(4n-3), .photos > div:nth-child(4n-1)').forEach(item => {
        item.style.gridRow = "span 2";
    });
    document.querySelectorAll('.photos > div:nth-child(4n-2), .photos > div:nth-child(4n)').forEach(item => {
        item.style.gridRow = "span 1";
    });
    } else {
    // force same sizes for filtered results
    images.forEach(item => {
        if (item.style.display !== "none") {
        item.style.gridRow = "span 1";
        }
    });
    }

  // Toggle "{term} Not Found" message when the input does not match any image alt text
    if (found === 0) {
    notFound.style.display = "block";
    notFound.textContent = `"${term}" Not Found!`
    container.style.display = "none";
    } else {
    notFound.style.display = "none";
    container.style.display = "grid";
    }
});
