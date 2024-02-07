function pageActions() {
  return {
    isProcessing: false,
    importData() {

      this.isProcessing = true;
      var formData = new FormData(document.getElementById('mainForm'));
      fetch('/import', {
        method: 'POST',
        body: formData
      }).then(response => {
        if (!response.ok) {
          return response.text().then(text => Promise.reject(new Error(text)));
        }
        const filename = response.headers.get('Content-Disposition').match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];

        return response.blob().then(blob => ({ blob, filename })); // Return both blob and filename
      }).then(({blob, filename}) => {
        if (blob.size > 0) {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = filename.replace(/['"]/g, '');
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          throw new Error('Error: File is empty!');
        }
      }).catch(error => {
        alert(error.message);
        console.error('There has been a problem with your fetch operation:', error);
      }).finally(() => {
        this.isProcessing = false;
      });
    },
    exportData() {
      console.log('exportData');
    },
    deleteDataByBatch() {
      console.log('deleteDataByBatch');
      var batch = document.getElementById('batch').value;
      var source = document.getElementById('source').value;

      fetch('/delete_data_by_batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          batch: batch,
          source: source
        })
      }).then(response => {
        if (response.ok) {
          return response.text();
        }

        return response.text().then(text => Promise.reject(new Error(text)));
      }).then(text => {
        document.getElementById('batch').value = '';
        alert("Xóa dữ liệu thành công!");
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