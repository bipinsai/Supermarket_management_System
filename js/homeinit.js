console.log(window.location.search.substring(1).substring(5));
useridhash = window.location.search.substring(1).substring(5);

fetch('http://localhost:3000/home', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    useridhash: useridhash
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(JSON.stringify(data));
                $('.nav-name').html(data.firstName+" "+data.lastName);
            })
            .catch((err)=>console.log(err));