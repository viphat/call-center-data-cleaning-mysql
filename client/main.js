function pageActions() {
  return {
    importData() {
      console.log('importData');
      var formData = new FormData(document.getElementById('mainForm'));
      fetch('/import', {
        method: 'POST',
        body: formData
      }).then(response => {
        if (response.ok) {
          return response.text();
        }

        return response.text().then(text => Promise.reject(new Error(text)));
      }).then(text => {
        console.log(text);
      }).catch(error => {
        alert(error.message);
        console.error('There has been a problem with your fetch operation:', error);
      });
    },
    exportData() {
      console.log('exportData');
    },
    deleteDataByBatch() {
      console.log('deleteDataByBatch');
      var batch = document.getElementById('batch').value;
      fetch('/delete_data_by_batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          batch: batch
        })
      }).then(response => {
        if (response.ok) {
          return response.text();
        }

        return response.text().then(text => Promise.reject(new Error(text)));
      }).then(text => {
        console.log(text);
      }).catch(error => {
        alert(error.message);
        console.error('There has been a problem with your fetch operation:', error);
      });
    },
    checkData() {
      console.log('checkData');
    },
    importHospital() {
      console.log('importHospital');
    }
  }
}