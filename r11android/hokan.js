var HV_UNIFORM	= 0;
var HV_ACCELETATE	= 1;
var HV_SLOWDOWN		= 2;

function hokan() {
    this.hv_now;
    this.hv_targ;
    this.hv_c;
    this.hv_v;
    this.hv_move;
    this.hvstart	= false;
    this.hvend		= false;
    this.init	= function(_now ,_targ ,_c ,_move){
	this.hv_now	= _now;
	this.hv_targ	= _targ;
	this.hv_c	= _c;
	this.hv_v	= 0;
	this.hv_move	= _move;
	this.hvstart	= true;
	this.hvend	= false;
    }

    this.value	= function(){
	var nx	= parseFloat(this.hv_now);
	var tx	= parseFloat(this.hv_targ);
	var c	= parseFloat(this.hv_c);
	var v	= parseFloat(this.hv_v);
	var	ret;
	v++;
	if (v >= c) {
	    this.hv_now	= tx;
	    this.hv_v	= c;
	    this.hvend	= true;
	    this.hvstart	= false;
	    delete nx;
	    delete tx;
	    delete c;
	    delete v;
	    delete ret;
	    return	this.hv_now;
	}
	this.hv_v	= v;
	// “™‘¬
	if(this.hv_move == 0){
	    this.hv_now	= (tx-nx)/(c-v+1) + nx;
	}
	// ‰Á‘¬
	else if(this.hv_move == 1){
	    this.hv_now	= tx - (tx-nx)*(c*(c+1)-v*(v+1))/(c*(c+1)-v*(v-1));
	}
	// Œ¸‘¬
	else if(this.hv_move == 2){
	    this.hv_now	= tx - (tx-nx)*(c*(c+1)-2*c*v+v*(v-1))/(c*(c+1)-2*c*(v-1)+(v-1)*(v-2));
	}
	delete nx;
	delete tx;
	delete c;
	delete v;
	delete ret;
	return	this.hv_now;
    }

    this.isvalue	= function(){
	return	this.hvstart;
    }
}