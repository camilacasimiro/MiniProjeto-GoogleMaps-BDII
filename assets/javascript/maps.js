let map;
let marker;

let center = { lat: -9.826044705294152, lng: -56.56730846033254 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 4,
  });

  marker = new google.maps.Marker({
    map: map,
    position: center,
    draggable: true,
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener("position_changed", () => {
    map.setCenter(marker.position);
  });
}

function addMarker(evt) {
  marker.setPosition(evt.latLng);
}

function save() {
  const obj = {
    name: document.getElementById("name").value,
    checkin: document.getElementById("checkin").value,
    checkout: document.getElementById("checkout").value,
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng(),
  };

  fetch("http://localhost:3333/pontos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      alert("Inserido!");
    })
    .catch((error) => alert("Falha ao salvar!"));
}

const destiny = () => {
  fetch("http://localhost:3333/destiny")
    .then((res) => res.json())
    .then((data) => {
      const size = data.length;

      const point = {
        lat: data[size - 1].st_x,
        lng: data[size - 1].st_y,
      };

      map = new google.maps.Map(document.getElementById("map"), {
        center: point,
        zoom: 4,
      });

      const marker = new google.maps.Marker({
        map: map,
        position: point,
      });

      map.addListener("center_changed", () => {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(() => {
          map.panTo(marker.getPosition());
        }, 3000);
      });
      marker.addListener("click", () => {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      });
    });
};
