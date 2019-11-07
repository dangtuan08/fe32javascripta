function NguoiDungService() {

    this.themNguoiDung = function (nguoiDung) {
        return axios({
            method: "POST",
            url: "http://5dbacbaf3ec5fb001431941d.mockapi.io/api/NguoiDung",
            data: nguoiDung,
        });
    };

    this.layDanhSachNguoiDung = function () {
        // GET: lấy thông tin người dùng
        // POST: them người dùng len server
        // PUT: Cập nhật người dùng
        // DELETE: xoá người dùng
        // cách 1 return nguyen axios để xử lý bên main.js
        return axios({
            method: "GET",
            url: "http://5dbacbaf3ec5fb001431941d.mockapi.io/api/NguoiDung"
        })

        // cách 2: xử lý tại class và chuyển hàm tạo bảng từ main sang
        // axios({
        //     method: "GET",
        //     url: "http://5dbacbaf3ec5fb001431941d.mockapi.io/api/NguoiDung"
        // })
        //nếu thực hiện được thì chạy then không thì chạy catch
        // .then(function (result) {
        //     renderTable(result.data);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })

    };

    this.layThongTinNguoiDung = function (id) {
        // GET: lấy thông tin người dùng
        // POST: them người dùng len server
        // PUT: Cập nhật người dùng
        // DELETE: xoá người dùng
        // cách 1 return nguyen axios để xử lý bên main.js
        return axios({
            method: "GET",
            url: `http://5dbacbaf3ec5fb001431941d.mockapi.io/api/NguoiDung/${id}`,
        })
    };

    this.xoaNguoiDung = function (id) {
        return axios({
            method: "DELETE",
            url: `http://5dbacbaf3ec5fb001431941d.mockapi.io/api/NguoiDung/${id}`,
        });
    };

    this.suaNguoiDung = function (id, data) {
        return axios({
            method: "PUT",
            url: `http://5dbacbaf3ec5fb001431941d.mockapi.io/api/NguoiDung/${id}`,
            data: data,
        });
    }
    // cách 1
    // this.timKiemNguoiDung = function (chuoiTimKiem, mangNguoiDung) {
    //     var mangTimKiem = [];
    //     mangNguoiDung.map(function (item, index) {
    //         if (item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
    //             mangTimKiem.push(item);
    //         }
    //     });
    //     return mangTimKiem;
    // }

    // cách 2: dùng filter
    this.timKiemNguoiDung = function (chuoiTimKiem, mangNguoiDung) {
        // filter trả về giá trị là 1 mảng các item thỏa điều kiện
        return mangNguoiDung.filter(function(item){
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1
        })
    }
}

