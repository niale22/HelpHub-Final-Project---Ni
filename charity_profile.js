const data = {
    feedingamerica: {
        name: "Feeding America",
        logo: "Feeding-America_logo-web.png",
        description: "Feeding America is the largest hunger-relief organization in the United States. Through a nationwide network of food banks, it provides meals to millions of people each year and works to raise awareness about food insecurity in local communities.",
        contact: "Email: info@feedingamerica.org | Phone: 1-800-771-2303",
        website: "Website: <a href='https://www.feedingamerica.org' target='_blank'>feedingamerica.org</a>"
    },
    habitat: {
        name: "Habitat for Humanity",
        logo: "Habitat-For-Humanity-Logo.jpg",
        description: "Habitat for Humanity is a nonprofit housing organization that helps families build and improve places to call home. Volunteers work alongside future homeowners to build safe, affordable houses in communities around the world.",
        contact: "Email: info@habitat.org | Phone: 1-800-HABITAT",
        website: "Website: <a href='https://www.habitat.org' target='_blank'>habitat.org</a>"
    },
    aspca: {
        name: "ASPCA",
        logo: "ASPCA_Logo.jpg",
        description: "The ASPCA (American Society for the Prevention of Cruelty to Animals) is one of the oldest animal welfare organizations in the United States. It works to rescue animals from abuse, pass humane laws, and support shelters nationwide through public outreach and advocacy.",
        contact: "Email: info@aspca.org | Phone: 1-800-628-0028",
        website: "Website: <a href='https://www.aspca.org' target='_blank'>aspca.org</a>"
    },
    redcross: {
        name: "American Red Cross",
        logo: "qwer.jpeg",
        description: "The American Red Cross provides emergency assistance, disaster relief, and disaster preparedness education. Volunteers are the backbone of the organization, helping with blood drives, shelter support, emergency response, and more in communities across the country.",
        contact: "Email: info@redcross.org | Phone: 1-800-733-2767",
        website: "Website: <a href='https://www.redcross.org/volunteer' target='_blank'>redcross.org/volunteer</a>"
    }
};

const params = new URLSearchParams(window.location.search);
const charityKey = params.get("charity");

if (data[charityKey]) {
    const charity = data[charityKey];
    document.getElementById("charity-name").textContent = charity.name;
    document.getElementById("charity-description").textContent = charity.description;
    document.getElementById("charity-contact").textContent = charity.contact;
    document.getElementById("charity-website").innerHTML = charity.website;

    const logoImg = document.getElementById("charity-logo");
    logoImg.src = charity.logo;
    logoImg.alt = charity.name + " Logo";
    logoImg.style.display = "block";
} else {
    document.getElementById("charity-name").textContent = "Charity Not Found";
    document.getElementById("charity-description").textContent = "Sorry, we couldn't load information for this charity.";
}

document.getElementById("volunteerBtn").addEventListener("click", () => {
    document.getElementById("volunteerForm").style.display = "block";
    document.getElementById("volunteerBtn").style.display = "none";
});

document.getElementById("volunteerFormInner").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("volunteerMsg").textContent = "Submitted successfully!";
    this.reset();
});

const facts = {
    feedingamerica: "Feeding America provides over 6 billion meals a year!",
    habitat: "Habitat for Humanity operates in all 50 U.S. states and 70+ countries.",
    aspca: "The ASPCA was the first humane society in North America.",
    redcross: "The American Red Cross responds to more than 60,000 disasters every year."
};

const logoImg = document.getElementById("charity-logo");

logoImg.addEventListener("mouseenter", () => {
    const fact = facts[charityKey];
    if (fact) {
        const factElem = document.createElement("p");
        factElem.id = "fun-fact";
        factElem.style.color = "#007BFF";
        factElem.style.marginTop = "10px";
        factElem.textContent = "Did you know? " + fact;
        logoImg.insertAdjacentElement("afterend", factElem);
    }
});

logoImg.addEventListener("mouseleave", () => {
    const factElem = document.getElementById("fun-fact");
    if (factElem) {
        factElem.remove();
    }
});

fetch('https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json')
  .then(response => response.json())
  .then(data => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const quote = data[randomIndex];

    const quoteBox = document.createElement('aside');
    quoteBox.style.marginTop = "30px";
    quoteBox.style.backgroundColor = "mistyrose";
    quoteBox.style.borderLeft = "6px solid red";
    quoteBox.style.padding = "15px";
    quoteBox.style.borderRadius = "5px";
    quoteBox.style.fontStyle = "italic";
    quoteBox.innerHTML = `"${quote.quoteText}" — ${quote.quoteAuthor || "Unknown"}`;

    document.querySelector('main').appendChild(quoteBox);
  })
  .catch(error => {
    const errorBox = document.createElement('aside');
    errorBox.style.color = "red";
    errorBox.textContent = "Could not load quote at this time. Please try again later.";
    document.querySelector('main').appendChild(errorBox);
  });