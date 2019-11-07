var nguoiDungService = new NguoiDungService();
var mangNguoiDung = [];
function getListUser() {
    nguoiDungService.layDanhSachNguoiDung().then(function (result) {
        renderTable(result.data);
        setLocalStorage(result.data);
    })
        .catch(function (error) {
            console.log(error);
        })
}

getListUser();

function getEle(id) {
    return document.getElementById(id);
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
    var title = "Thêm Người Dùng";
    var footer = `
        <button class="btn btn-success" onclick="themNguoiDung()">Thêm</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})

// tạo bảng
function renderTable(mangNguoiDung) {
    var contentHTML = "";
    mangNguoiDung.map(function (item, index) {
        contentHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>${item.maLoaiNguoiDung}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick="sua(${item.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="xoa(${item.id})">Xóa</button>
                </td>
            </tr>
        `
    })

    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}
//Thêm người dùng
function themTestGit(){
    console.log("them chuc nang dangtuan0893");
    
}

function themNguoiDung() {
    // console.log("123");
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);

    nguoiDungService.themNguoiDung(nguoiDung).then(function (result) {
        // console.log(result);
        // location.reload();
        getListUser(); //thêm thành công load lại bảng

    }).catch(function (error) {
        console.log(error)
    });


}

function xoa(id) {
    console.log(id);
    nguoiDungService.xoaNguoiDung(id).then(function (result) {
        getListUser()
    }).catch(function (error) {
        console.log(error.response.data);
        if (error.response.status === 404) {
            alert("Ma nguoi dung sai");
        }
    })
}

function sua(id) {
    // console.log("click")
    var title = "Sửa Người Dùng";
    var footer = `
        <button class="btn btn-success" onclick="capNhatNguoiDung(${id})">Cập nhật</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    nguoiDungService.layThongTinNguoiDung(id).then(function (result) {
        console.log(result);
        getEle("TaiKhoan").setAttribute("disabled", true);
        getEle("TaiKhoan").value = result.data.taiKhoan;
        getEle("HoTen").value = result.data.hoTen;
        getEle("MatKhau").value = result.data.matKhau;
        getEle("Email").value = result.data.email;
        getEle("SoDienThoai").value = result.data.soDT;
        getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
    }).catch(function (error) {
        console.log(error.response.data);
        if (error.response.status === 404) {
            alert("Ma nguoi dung sai");
        }
    })

}

function capNhatNguoiDung(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);

    nguoiDungService.suaNguoiDung(id, nguoiDung).then(function (result) {
        getListUser();

    }).catch(function (error) {
        console.log(error)
    });
}

//Lưu mảng người dùng xuống localStorage
function setLocalStorage(mangNguoiDung) {
    localStorage.setItem("danhSachNguoiDung", JSON.stringify(mangNguoiDung));
}
function getLocalStorage() {
    // kiểm tra có danh sách trong localStorage
    if (localStorage.getItem("danhSachNguoiDung")) {
        // ép kiểu string lại thành JSON gán lại cho danh sách nhân viên
        return JSON.parse(localStorage.getItem("danhSachNguoiDung"));
    }
}
getEle("txtSearch").addEventListener("keyup", function () {
    var mangNguoiDung = getLocalStorage();
    // console.log(mangNguoiDung);
    var chuoiTimKiem = getEle("txtSearch").value;
    var mangNguoiDung = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, mangNguoiDung);
    renderTable(mangNguoiDung);
})
