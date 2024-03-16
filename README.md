# Reservation-App
Created By Shane Mindreau.


### To Do:
- The React HTML file needs a favicon/browser icon.
    - The public/vite.svg directory and file can be deleted once the icon is updated.
- The React README.md file should be updated.
- When deploying on netlify, don't forget to add the netlify configurations for react router dom (multiple webpages).
- Update the token secret in the auth.js file from the /server/utils directory.

-get rid of the success useState in the Signup file.
-update the Error txt messages (email and phone number) for the login form.

-double check all Auth imports.

-Add services and payment(default) to ReservationForm.jsx.

To Learn More About GraphQL:
https://www.apollographql.com/tutorials/lift-off-part4/02-what-is-a-mutation

```
  const addService = (e) => {
    e.preventDefault();
    const itemKey = serviceKey;
    setServiceKey(itemKey + 1);
    var storage = JSON.parse(localStorage.getItem("services"));
    if (storage) {
      storage.push({[itemKey]: {type: "", client: "", price: 0}});
      localStorage.setItem("services", JSON.stringify(storage));
    } else {
      localStorage.setItem("services", JSON.stringify([{[itemKey]: {type: "", client: "", price: 0}}]));
    }

    return (
      <div itemKey={itemKey} className="flexColumn">
          <input className="formFields" type="text" placeholder="Type of Service" autoComplete="off" onChange={(e) => {
            const key = e.target.parentElement.getAttribute("itemKey");
            var LocStorage = JSON.parse(localStorage.getItem("services")).map((item) => {
              item[key] ? item[key].type = e.target.value : null;
            });
            localStorage.setItem("services", JSON.stringify(LocStorage));
          }} />
          
          <input className="formFields" type="text" placeholder="Client for Service" autoComplete="off" onChange={(e) => {
            const key = e.target.parentElement.getAttribute("itemKey");
            var LocStorage = JSON.parse(localStorage.getItem("services")).map((item) => {
              item[key] ? item[key].client = e.target.value : null;
            });
            localStorage.setItem("services", JSON.stringify(LocStorage));
          }} />
          
          <input className="formFields" type="text" placeholder="Price" autoComplete="off" onChange={(e) => {
            const key = e.target.parentElement.getAttribute("itemKey");
            var LocStorage = JSON.parse(localStorage.getItem("services")).map((item) => {
              item[key] ? item[key].price = e.target.value : null;
            });
            localStorage.setItem("services", JSON.stringify(LocStorage));
          }} />
          <button onClick={(e) => {
            const key = e.target.parentElement.getAttribute("itemKey");
            var LocStorage = JSON.parse(localStorage.getItem("services")).filter((item) => {
              var targetKey = Objects.keys(item);
              targetKey =! key;
            });
            localStorage.setItem("services", JSON.stringify(LocStorage));
            e.target.parentElement.remove();}}>Delete</button>
      </div>);
    
  };
```