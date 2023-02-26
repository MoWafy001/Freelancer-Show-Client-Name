var url;
var project;
var user;

const getSEOUrl = () => {
  try{
    return document.URL.match("projects/(.+)/details")[0].replace("/details","").replace("projects/","")
  }catch(e){
    return null
  }
}

const getProject = async seoUrl => {
  const project = await fetch("https://www.freelancer.com/api/projects/0.1/projects?seo_urls%5B%5D=" + seoUrl)
                  .then(res => res.json())
                  .then(data => data.result.projects[0])

  return project
}

const getUser = async userId => {
  const user = await fetch("https://www.freelancer.com/api/users/0.1/users/" + userId)
                  .then(res => res.json())
                  .then(data => data.result)
                  
  return user
}

const displayClientName = (publicName, username) => {
  let element
  let c = 0;

  const i = setInterval(()=>{
    element = [...document.querySelectorAll("fl-card-header-title")].find(e=>e.innerText==="About the Client") 
    if(element || c >= 5){
      clearInterval(i)
    }else{
      c++;
      return
    }
    element.innerHTML += `
      <a href="https://www.freelancer.com/u/${username}" style="color:#0060df">${publicName}</a>
    `
  },1000)
}

const main = async () => {
  url = getSEOUrl()
  if(!url){
    console.log("invalid URL")
    return
  }

  project = await getProject(url)
  user = await getUser(project.owner_id)

  displayClientName(user.public_name, user.username)
}

main()
