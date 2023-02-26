var url = document.URL.split("projects/")[1].trim()
if(url.endsWith("/")) url = url.slice(0, url.length - 1)

const getProject = async seoUrl => {
  const project = await fetch("https://www.freelancer.com/api/projects/0.1/projects?seo_urls%5B%5D=" + seoUrl)
                  .then(res => res.json())
                  .then(data => data.result.projects[0])
}
const getUser = userId => {}
