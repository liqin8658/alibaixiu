$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,

        success: function (response) {
            location.reload();
        },
        error: function (err) {
            var res = JSON.parse(err.responseText);
            alert(res.message)
        }
    });
    return false
});
$('#modifyBox').on('change','#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#pre').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar)
        }
    });
})

$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        console.log(response);
        var html = template('tlp',{data:response});
        console.log(html);
        $('#box').html(html);
    }
});
$('#box').on('click','.edit',function() {
    var id = $(this).attr('data_id');
    $.ajax({
        type: "get",
        url: '/users/' + id,
    
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl',response);
            $('#modifyBox').html(html);
        }
    });
})
$('#modifyBox').on('submit','#modifyForm',function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type: "PUT",
        url: "/users/"+id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false;
})