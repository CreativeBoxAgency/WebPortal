// Function to truncate text after the ninth word and append ellipsis
function truncateTitle(sentence) {
  let words = sentence.split(" ");
  let characterCount = 0;  // Initialize character count

  // Count characters excluding spaces
  words.forEach(word => {
      characterCount += word.length;
  });

  // Modify sentence if word count exceeds 9
  if (words.length > 9) {
      words = words.slice(0, 9);  // Keep only the first 9 words
      words[8] += "...";  // Append '...' to the ninth word
  }

  return words.join(" ");  // Join the words back into a modified sentence
}

// Utility to handle fetching and updating blog data
function fetchBlogData(url, callback) {
  $.get(url, callback).fail(() => {
    console.error("Failed to fetch data from the server.");
  });
}

// Function to update UI components with blog data
function updateBlogUI(blogLink) {
  $(".change-hover-image").css("background-image", `url(${blogLink.imageUrl})`);
  $(".firstParagraph").text(blogLink.firstParagraph);
  $(".h1.blog-title").text(truncateTitle(blogLink.title));  // Apply truncation to the title
  $(".category-link").attr("href", blogLink.url);
}

let currentIndex = 0;
let blogLinks = [];

// Initial fetch of blog data
fetchBlogData("https://blog-scraper-59ac02e724dd.herokuapp.com/", function(data) {
  blogLinks = data;
  if (blogLinks.length > 0) {
      updateBlogUI(blogLinks[currentIndex]);
  }
});

// Pagination handlers
function changeBlogLink(step) {
  if (!blogLinks.length) return;
  currentIndex = (currentIndex + step + blogLinks.length) % blogLinks.length;
  updateBlogUI(blogLinks[currentIndex]);
}

$(".w-pagination-next.button-outline").click(() => changeBlogLink(1));
$(".w-pagination-previous.button-outline").click(() => changeBlogLink(-1));
