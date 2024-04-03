new DataTable('#example');

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 84a7b02e6a5b1803c8cce51b66da0da951fd8136");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

/*JANJI TEMU*/
fetch("https://api.enygma.id/v1/datasets/getdata/enygma_guibjx", requestOptions)
  .then((res) => res.json())
  .then(res => {
    const data = res.data;
    let rows = '';
    data.forEach(users => {
      rows += `<tr> 
           <td> ${users.custom_unique_id}</td>
            <td> ${users.data_date}</td>
            <td> ${users.jam}</td>
            <td> ${users.yang_dituju}</td>
            <td> ${users.lokasi}</td>
            <td> ${users.ruangan}</td>
            <td> ${users.perihal}</td>
            <td> ${users.status ? "Diterima" : "Ditolak"}</td>
            <td>
              <button>Y</button>
              <button>X</button>
            </td>
    </tr>`
    })
    console.log(rows)
    document.getElementById('tablerows').innerHTML = rows;

  })


  /*JADWAL MEETING*/
  fetch("https://api.enygma.id/v1/datasets/getdata/enygma_guibjx", requestOptions)
  .then((res) => res.json())
  .then(res => {
    const data = res.data;
    let rows = '';
    data.forEach(users => {
      rows += `<tr> 
           <td> ${users.custom_unique_id}</td>
            <td> ${users.data_date}</td>
            <td> ${users.jam}</td>
            <td> ${users.yang_dituju}</td>
            <td> ${users.lokasi}</td>
            <td> ${users.ruangan}</td>
            <td> ${users.perihal}</td>
    </tr>`
    })
    console.log(rows)
    document.getElementById('meeting').innerHTML = rows;

  })


/*PEGAWAI CUTI*/
fetch("https://api.enygma.id/v1/datasets/getdata/enygma_wbeswrro", requestOptions)
  .then((response) => response.json())
  .then(result => {
    const datas = result.data;
    let row = '';
    datas.forEach(cuti => {
      row += `<tr>
      <td>${cuti.custom_unique_id}</td>
      <td>${cuti.nama}</td>
      <td>${cuti.tanggal_cuti}</td>
      <td>${cuti.tanggal_masuk}</td>
      <td>${cuti.keterangan}</td>
      </tr>`
    })
    console.log(row)
    document.getElementById('cuti').innerHTML = row;
  })


/*PEGAWAI LEMBUR*/
fetch("https://api.enygma.id/v1/datasets/getdata/enygma_snrowszxx", requestOptions)
  .then((response) => response.json())
  .then(result => {
    const data = result.data;
    let row = '';
    data.forEach(lembur => {
      row += `<tr>
    <td>${lembur.custom_unique_id}</td>
    <td>${lembur.nama}</td>
    <td>${lembur.data_date}</td>
    <td>${lembur.start}</td>
    <td>${lembur.finish}</td>
    <td>${lembur.durasi}</td>
    </tr>`
    })
    console.log(row)
    document.getElementById('lembur').innerHTML = row
  })

/*PEGAWAI TELAT*/
fetch("https://api.enygma.id/v1/datasets/getdata/enygma_fullafoq", requestOptions)
  .then((response) => response.json())
  .then(result => {
    const data = result.data;
    let row = '';
    data.forEach(telat => {
      row += `<tr>
      <td>${telat.custom_unique_id}</td>
      <td>${telat.nama}</td>
      <td>${telat.data_date}</td>
      <td>${telat.jam_datang}</td>
      <td>${telat.alasan}</td>
      </tr>`
    })
    console.log(row)
    document.getElementById('telat').innerHTML = row
  })


/* ANGGOTA*/
fetch("https://api.enygma.id/v1/datasets/getdata/enygma_iwmvyll", requestOptions)
  .then((response) => response.json())
  .then(result => {
    console.log("result: " + JSON.stringify(result.data));
    const responseData = result.data;
    let content = "";

    responseData.forEach(anggota => {
      fetch(`https://api.enygma.id/v1/download?extname=${anggota.image}`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer 84a7b02e6a5b1803c8cce51b66da0da951fd8136"
        }
      })
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          console.log(buffer);
          const base64Image = `data:image/png;base64,${arrayBufferToBase64(buffer)}`;

          content += `
          <div class="crd">
              <div class="imgBx" id="img">
              <img src="${base64Image}" alt="">
              </div>
              <div class="cont">
                  <div class="details">
                      <div id="detail">
                      <h2>${anggota.nama}<br><span>${anggota.asal_sekolah}</span></h2></div>
                      <div id="dt" class="data">
                        <h5>Mulai<br><span>${anggota.mulai}</span></h5>
                        <h5>Selesai<br><span>${anggota.selesai}</span></h5>
                      </div>
                  </div>
              </div>
          </div>
        `;

          document.querySelector(".kontainer").innerHTML = content;
        })
        .catch(error => console.error('Error fetching image:', error));
    });
  })
  .catch(error => console.error('Error fetching data:', error));

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/*FAQ*/
fetch("https://api.enygma.id/v1/datasets/getdata/enygma_btfsgrnxpj", requestOptions)
  .then((response) => response.json())
  .then(result => {
    const data = result.data;
    let acc = '';
    data.forEach(faq => {
      acc += `
      <details>
      <summary>${faq.title}</summary>
      <p>${faq.answer}</p>
      </details>
        `
    });
    console.log(acc)
    document.querySelector(".acc").innerHTML = acc;
  })
  .catch((error) => console.error(error));








