const cafeList = document.querySelector("#cafe-list")
const form = document.querySelector("#add-cafe-form")


//create element and render cafe
const renderCafe = (doc) => {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');


    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    cafeList.appendChild(li);

    li.appendChild(cross);

    //deleting data
    cross.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
};

//realtime listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    console.log(changes);
    changes.forEach(change => {
        console.log(change.doc.data());

        if (change.type == 'added'){
            renderCafe(change.doc)
        }else if (change.type == 'removed'){
            console.log(change)
            let li = cafeList.querySelector('[data-id=' + change.doc.id +']');
            console.log('removed data:' +li);
            cafeList.removeChild(li);
        }
    })

});


// findById
/*id ye gore data :
*  db.collection('cafes').doc('docId')  bu sekılde cagırılabilir.
* */

// update
/*id ye gore data :
*  db.collection('cafes').doc('docId').update({
*  name: 'atasilyas',
*  city: 'erzincan'
* });
* */

// var olan documnet ovrerride etme herseyi degiştirme
/*id ye gore data :
*  db.collection('cafes').doc('docId').set({
*  name: 'atasilyas'   // burada db de bulunan city alanı silinir yeni bir obje gibi davraınr
* });
* */


//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault(); // reload devre dsıı bırak. Yani default ozelligi devre dısı bırak
    const data = db.collection('cafes').add({
        name: form.name.value, /*<input type="text" name="name veya city" placeholder="cafe name">*/
        city: form.city.value // buradaki city html deki name degeridir.
    });

    form.name.value = '';
    form.city.value = '';

});


/*
getting data  by querys
db.collection("cafes").where('city', '==', 'van').orderBy('name').get().then((snap) => { // orderBy ile sıralama yapılır
    snap.docs.forEach(doc => {
        renderCafe(doc);
    })
});*/

/*getting data
db.collection('cafes').get().then((snap) => {
    snap.docs.forEach(doc => {
        renderCafe(doc);
    })
});*/



