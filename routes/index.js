
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.redirect('/profile/me');
};

exports.profile = function(req, res){
  var id_req = req.params.user;
  req.facebook.api('/'+id_req+'/picture?redirect=false&type=large', function(err, profpic) {
    req.facebook.api('/'+id_req, function(err, data) {
      res.render('profile', {title: data.name, profile:data, profpic:profpic.data.url});
    });
  });
};

exports.personalize = function(req, res){
  var id_req = req.params.user;
  req.facebook.api('/'+id_req+'/picture?redirect=false&type=large', function(err, profpic) {
    req.facebook.api('/'+id_req, function(err, data) {
      res.render('profile', {title: data.name, profile:data, profpic:profpic.data.url});
    });
  });
};