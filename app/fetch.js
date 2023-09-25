class FetchDemo {
    constructor(paramsID) {
        this.url = "http://localhost:3000"

    }

    post(paramsData, category) {
        this.url += `/${category}`;
        return new Promise((resolve, reject) => {
            return fetch(this.url, {
                method: "POST",
                body: JSON.stringify(paramsData),
                headers: {"content-type": "application/json"},
            })
                .then((response) => response.json())
                .then((jsonData) => resolve(jsonData))
                .catch((err) => reject(err));
        });

    }


    get(decoder, category) {
        if (decoder) {
            this.url += `/${category}/${decoder}`;
        } else {
            this.url += `/${category}`;
        }
        return new Promise((resolve, reject) => {
            return fetch(this.url)
                .then((response) => response.json())
                .then((responseData) => resolve(responseData))
                .catch((err) => reject(err));
        });
    }

    delete(decoder, category) {
        if (decoder) {
            this.url += `/${category}/${decoder}`;
        } else {
            this.url += `/${category}`;
        }
        return new Promise((resolve,reject)=>{
            return fetch((this.url),{
                method:"DELETE",
            })
                .then((response) => resolve("Deleted successfully"))
                .catch((err) => reject(err));


        })
    }
}