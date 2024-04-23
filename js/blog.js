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
    $(".h1.blog-title").text(blogLink.title);
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
  