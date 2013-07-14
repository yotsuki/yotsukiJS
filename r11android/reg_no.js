var SF_MAX = 137;
var LR_START = 138;
var REG_START = 143;//297-136;
var RegName = [
/*SYSTEM*/	
    "SR_GAME_COUNT",	//=SYS_REG_START,		/* [00] �Q�[����			*/
    "SR_TITLE",				/* [01] �^�C�g��			*/
/*SCRIPT*/
    "SR_LIN",	//					/* [02] ��X�g���X�l			*/
    "SR_COCORO_ILLUST",	//			/* [03] �����̃C���X�g			*/	/* ������Q����		*/
    "SR_COCORO_MAGURO",	//			/* [04] �i�{�[�������ꂽ		*/	/* ������Q����		*/
    "SR_COCORO_HUTAGO",	//			/* [05] ��ɑo�q��			*/	/* ������Q����		*/
    "SR_COCORO_KANRI_COCORO",	//			/* [06] �H���������낪�Ǘ�		*/	/* ������S����		*/
    "SR_SATORU_NAYAMU",	//			/* [07] �ƂĂ��Y��			*/	/* ��P����		*/
    "SR_SATORU_COFFEE",	//			/* [O8] �Q���ڂɃR�[�q�[����łȂ�	*/	/* ��Q����		*/
    "SR_SATORU_COCORO_LIVE",	//			/* [09] �����낪�����Ă��Ă���Ċ�����	*/	/* ��R����		*/
    "SR_SATORU_GURUGURU",	//			/* [10] ��Ƃ��邮��b���ĂȂ�		*/	/* ��T����		*/ //10
    "SR_BAD_COCORO_SUIMINYAKU",	//		/* [11] ���������łȂ�		*/	/* ������P����		*/
    "SR_BAD_COCORO_SYOKUJI",	//			/* [12] �R���ڂƂS���ڃX�t�B�A�ŐH�ׂ�	*/	/* ������R����		*/
    "SR_BAD_COCORO_ENOMOTO",	//			/* [13] �|�{�ɎE�����			*/	/* ������S����		*/
    "SR_BAD_COCORO_SPHIA",	//			/* [14] �X�t�B�A�ő����		*/	/* ������S����		*/
    "SR_BAD_COCORO_LIN_1",	//			/* [15] �ᔭ���`			*/	/* ������T����		*/
    "SR_BAD_COCORO_YOMOGI",	//			/* [16] ����ؔ���			*/	/* ������T����		*/
    "SR_BAD_COCORO_LIN_2",	//			/* [17] �ᔭ���a			*/	/* ������T����		*/
    "SR_BAD_COCORO_LIN_3",	//			/* [18] �ᔭ���b			*/	/* ������T����		*/
    "SR_BAD_COCORO_AKEKURA",	//			/* [19] ��q�ő���			*/	/* ������T����		*/
    "SR_BAD_COCORO_TOUSI_COCORO",	//		/* [20] ���̌���œ���			*/	/* ������T����		*/ // 20
    "SR_BAD_COCORO_UNI",	//			/* [21] ��ɒ�̉��ǂŎ��S		*/	/* ������T����		*/
    "SR_BAD_COCORO_7A",	//			/* [22] ������7���ڂŎ��S�`		*/	/* ������V����		*/
    "SR_BAD_COCORO_7B",	//			/* [23] ������7���ڂŎ��S�a		*/	/* ������V����		*/
    "SR_BAD_SATORU_BAD",	//			/* [24] ��o�b�h�G���h�`		*/	/* ��Q����		*/
    "SR_BAD_SATORU_MIZU",	//			/* [25] ������ła�`�c			*/	/* ��S����		*/
    "SR_BAD_SATORU_YUBI",	//			/* [26] �w��΂���Ăa�`�c		*/	/* ��U����		*/
    "SR_BAD_SATORU_ROLLBAD",	//			/* [27] ���[���L��a�`�c		*/	/* ��V����		*/
    "SR_ED_COUNT",	//				/* [28] �d�c��			*/	/* 			*/
    "SR_SHORTCUT",	//				/* [29] �V���[�g�J�b�g�����W�X�^	*/	/* �V���[�g�J�b�g	*/
    "SR_SHORTCUT_CO",	//				/* [30] �V���[�g�J�b�g�����W�X�^	*/	/* �V���[�g�J�b�g	*/ // 30
    "SR_SHORTCUT_SA",	//				/* [31] �V���[�g�J�b�g�����W�X�^	*/	/* �V���[�g�J�b�g	*/
    "SR_END_SATORU_EP",	//			/* [32] �O��v���C�Ҕ��ʗp		*/	/* �V���[�g�J�b�g	*/
    "SR_MAX",	//
/************************************************************************************************/
/* �V�X�e���t���O										*/
/************************************************************************************************/
/*SYSTEM*/
    "SF_GAME_START",// = SYS_FLG_START,		/* [00] �Q�[���N��			*/
    "SF_DEBUG_MODE",	//				/* [01] �f�o�b�O���[�h			*/
    "SF_02",	//					/* [02] 				*/
    "SF_03",	//					/* [03] 				*/
    "SF_04",	//					/* [04] 				*/
    "SF_05",	//					/* [05] 				*/
    "SF_06",	//					/* [06] 				*/	// 40
    "SF_07",	//					/* [07] 				*/
    "SF_08",	//					/* [08] 				*/
    "SF_09",	//					/* [09] 				*/
    "SF_10",	//					/* [10] 				*/
    "SF_11",	//					/* [11] 				*/
    "SF_12",	//					/* [12] 				*/
    "SF_13",	//					/* [13] 				*/
    "SF_14",	//					/* [14] 				*/
    "SF_15",	//					/* [15] 				*/
    "SF_ENDING_ALL",	//				/* [16] �G���f�B���O�S�J��		*/	// 50
    "SF_TITLE_ALL",	//				/* [17] �^�C�g���S�J��			*/
    "SF_ALBUM_ALL",	//				/* [18] �A���o���S�J��			*/
    "SF_MUSIC_ALL",	//				/* [19] �~���[�W�b�N�S�J��		*/
    "SF_MSG_ALL",	//				/* [20] ���b�Z�[�W�S�J��		*/
    "SF_SELECT_ALL",	//				/* [21] �I�����S�J��			*/
    "SF_TIME_ALL",	//				/* [22] �v���C���ԑS�J��		*/
    "SF_TIPS_ALL",	//				/* [23] �s�h�o�r�S�J��			*/
    "SF_24",	//					/* [24] 				*/
    "SF_HISTORY_N7",	//				/* [25] 				*/
    "SF_HISTORY_E17",	//				/* [26] 				*/	// 60
    "SF_HISTORY_MSG",	//				/* [27] 				*/
    "SF_ALL_CLEAR",	//				/* [28] 				*/
    "SF_GAME_CLEAR",	//				/* [29] 				*/
    "SF_TIPS_MSG",	//				/* [30] 				*/
    "SF_SELECT_MAX",	//				/* [31] �I�����ő�			*/
/*SCRIPT*/
    "SF_ED_COCORO_GOOD",	//			/* [32] ������҃N���A			*/	/* �������EP	*/
    "SF_ED_COCORO_SUIMINYAKU",	//		/* [33] ��������܂��a�`�c		*/	/* ������Q����	*/
    "SF_ED_COCORO_BAD_1",	//			/* [34] ��o�b�h�G���h�`		*/	/* ������R����	*/
    "SF_ED_COCORO_MIZU",	//			/* [35] ������ła�`�c			*/	/* ������S����	*/
    "SF_ED_COCORO_LIN_1",	//			/* [36] �ᔭ���`�a�`�c			*/	/* ������S����	*/ // 70
    "SF_ED_COCORO_SPHIA",	//			/* [37] �X�t�B�A�ő���a�`�c		*/	/* ������S����	*/
    "SF_ED_COCORO_ENOMOTO",	//			/* [38] �|�{�ɎE�����a�`�c		*/	/* ������S����	*/
    "SF_ED_COCORO_LIN_2",	//			/* [39] �ᔭ���a�a�`�c			*/	/* ������T����	*/
    "SF_ED_COCORO_YOMOGI",	//			/* [40] ����ؔ����a�`�c		*/	/* ������T����	*/
    "SF_ED_COCORO_SYOKUJI",	//			/* [41] �X�t�B�A�ŐH���a�`�c		*/	/* ������T����	*/
    "SF_ED_COCORO_LIN_3",	//			/* [42] �ᔭ���b�a�`�c			*/	/* ������T����	*/
    "SF_ED_COCORO_AKEKURA_1",	//			/* [43] ��q�ő���P�a�`�c		*/	/* ������T����	*/
    "SF_ED_COCORO_AKEKURA_2",	//			/* [44] ��q�ő���Q�a�`�c		*/	/* ������T����	*/
    "SF_ED_COCORO_TOUSHI_1",	//			/* [45] ���̌���œ����P�a�`�c		*/	/* ������T����	*/
    "SF_ED_COCORO_TOUSHI_2",	//			/* [46] ���̌���œ����Q�a�`�c		*/	/* ������T����	*/ // 80
    "SF_ED_COCORO_TOUSHI_UNI",	//		/* [47] ��ɓ����a�`�c			*/	/* ������U����	*/
    "SF_ED_COCORO_NADARE_1",	//			/* [48] ����P�a�`�c			*/	/* ������V����	*/
    "SF_ED_COCORO_NADARE_2",	//			/* [49] ����Q�a�`�c			*/	/* ������V����	*/
    "SF_ED_COCORO_NADARE_3",	//			/* [50] ����R�a�`�c			*/	/* ������V����	*/
    "SF_ED_COCORO_ROLLBAD",	//			/* [51] �Ӓ��̖��Q			*/	/* ������V����	*/
    "SF_ED_SATORU_GOOD",	//			/* [52] ��҃N���A�i�I�[���N���A�H�j	*/	/* ��҂V��	*/
    "SF_ED_SATORU_BAD_1",	//			/* [53] ��o�b�h�G���h�`		*/	/* ��Q����	*/
    "SF_ED_SATORU_SUIMINYAKU",	//		/* [54] ��������܂��a�`�c		*/	/* ��Q����	*/
    "SF_ED_SATORU_MIZU",	//			/* [55] ������ła�`�c			*/	/* ��S����	*/
    "SF_ED_SATORU_LIN_1",	//			/* [56] �ᔭ���`�a�`�c			*/	/* ��S����	*/ // 90
    "SF_ED_SATORU_SPHIA",	//			/* [57] �X�t�B�A�ő���a�`�c		*/	/* ��S����	*/
    "SF_ED_SATORU_ENOMOTO",	//			/* [58] �|�{�ɎE�����a�`�c		*/	/* ��S����	*/
    "SF_ED_SATORU_LIN_2",	//			/* [59] �ᔭ���a�a�`�c			*/	/* ��T����	*/
    "SF_ED_SATORU_YOMOGI",	//			/* [60] ����ؔ����a�`�c		*/	/* ��T����	*/
    "SF_ED_SATORU_YUBI",	//			/* [61] �w��΂���Ăa�`�c		*/	/* ��U����	*/
    "SF_ED_SATORU_ROLLBAD",	//			/* [62] ���[���L��a�`�c		*/	/* ��V����	*/
    "SF_ED_SATORU_KOYA",	//			/* [63] �����ɒN�����Ȃ��a�`�c		*/	/* ��V����	*/
    "SF_ED_SATORU_TOUSHI_UNI",	//		/* [64] ��ɓ����a�`�c			*/	/* ��V����	*/
    "SF_ED_COCORO_ENOMOTO_1",	//			/* [65] �폜�\��			*/	/* ���C�N�ʂ��p	*/
    "SF_ED_COCORO_ENOMOTO_2",	//			/* [66] �폜�\��			*/	/* ���C�N�ʂ��p	*/ // 100
    "SF_ED_COCORO_YUBI",	//			/* [67] �폜�\��			*/	/* ���C�N�ʂ��p	*/
    "SF_ED_SATORU_CHIRA_DMT",	//			/* [68] �`���~���Ƃc�l�s�̂a�`�c	*/	/* ��T����	*/
    "SF_ED_SATORU_EPILOGUE",	//			/* [69] ��҃G�s���[�O			*/	/* ��G�s���[�O	*/
    "SF_SC_COCORO_1A",	//			/* [70] ������P���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_1B",	//			/* [71] ������P���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_2A",	//			/* [72] ������Q���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_2B",	//			/* [73] ������Q���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_3A",	//			/* [74] ������R���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_3B",	//			/* [75] ������R���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_4A",	//			/* [76] ������S���ډ��	*/	/* �V���[�g�J�b�g	*/	// 110
    "SF_SC_COCORO_4B",	//			/* [77] ������S���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_5A",	//			/* [78] ������T���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_5B",	//			/* [79] ������T���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_6A",	//			/* [80] ������U���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_6B",	//			/* [81] ������U���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_7A",	//			/* [82] ������V���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_7B",	//			/* [83] ������V���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_COCORO_EP",	//			/* [84] ������G�s���		*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_1A",	//			/* [85] �T�g���P���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_1B",	//			/* [86] �T�g���P���ړr�����	*/	/* �V���[�g�J�b�g	*/	// 120
    "SF_SC_SATORU_2A",	//			/* [87] �T�g���Q���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_2B",	//			/* [88] �T�g���Q���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_3A",	//			/* [89] �T�g���R���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_3B",	//			/* [90] �T�g���R���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_4A",	//			/* [91] �T�g���S���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_4B",	//			/* [92] �T�g���S���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_5A",	//			/* [93] �T�g���T���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_5B",	//			/* [94] �T�g���T���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_6A",	//			/* [95] �T�g���U���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_6B",	//			/* [96] �T�g���U���ړr�����	*/	/* �V���[�g�J�b�g	*/	// 130
    "SF_SC_SATORU_7A",	//			/* [97] �T�g���V���ډ��	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_7B",	//			/* [98] �T�g���V���ړr�����	*/	/* �V���[�g�J�b�g	*/
    "SF_SC_SATORU_EP",	//			/* [99] �T�g���G�s���		*/	/* �V���[�g�J�b�g	*/
    "SF_SATORU_SYSMES",	//			/* [00] �T�g���r�x�r�l�d�r����	*/	/* �V���[�g�J�b�g	*/
    "SF_MES_MAX",	//				/* [01] �l�d�r�P�O�O��		*/	/* �V���[�g�J�b�g	*/
    "SF_MAX",	//	// 136
/************************************************************************************************/
/* ���[�J�����W�X�^										*/
/************************************************************************************************/
/*SYSTEM*/
    "LR_P00",	// = LOC_REG_START,			/* [00] �v���O�������W�X�^�O		*/
    "LR_P01",	//					/* [01] �v���O�������W�X�^�P		*/
    "LR_P02",	//					/* [02] �v���O�������W�X�^�Q		*/
    "LR_MODE",	//				/* [03] �v���O�������W�X�^�R		*/	// 140
    "LR_T00",	//					/* [04] �e���|�������W�X�^�O		*/
    "LR_DEBUG",	//				/* [05] �f�o�b�O			*/
    "LR_NO",	//					/* [06] �V�i���I�ԍ�			*/
    "LR_SEL",	//					/* [07] �I����				*/
    "LR_YEAR",	//				/* [08] �N				*/
    "LR_MON",	//					/* [09] ��				*/
    "LR_DAY",	//					/* [10] ��				*/
    "LR_WEK",	//					/* [11] �j				*/
    "LR_HOU",	//					/* [12] �� 				*/
    "LR_MIN",	//					/* [13] ��				*/	// 150
    "LR_WIN_OFF",	//				/* [14] �\���P�T			*/
    "MusicNo",	//				/* [15] �\���P�U			*/
/*SCRIPT*/
    "LR_PRO",	//					/* [10] �ŏ��̑I����			*/
    "LR_LIN",	//					/* [11] ��X�g���X�l			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LR_COCORO",	//				/* [12] ������̗͒l			*/
    "LR_COCORO_SYOKUJI",	//			/* [13] �H��				*/	/* ������P����	*/
    "LR_SATORU",	//				/* [14] ���i��Ҍv�Z�p���W�X�^�j	*/
    "LR_POINT",	//				/* [15] ���_�ۑ��p			*/
    "LR_RND",	//					/* [16] �����ۑ��p			*/
    "LR_M00",	//					/* [17] MACLOCAL�p���W�X�^		*/	// 160
    "LR_M01",	//					/* [18] MACLOCAL�p���W�X�^		*/
    "LR_M02",	//					/* [19] MACLOCAL�p���W�X�^		*/
    "LR_M03",	//					/* [20] MACLOCAL�p���W�X�^		*/
    "LR_M04",	//					/* [21] MACLOCAL�p���W�X�^		*/
    "LR_M05",	//					/* [22] MACLOCAL�p���W�X�^		*/
    "LR_M06",	//					/* [23] MACLOCAL�p���W�X�^		*/
    "LR_M07",	//					/* [24] MACLOCAL�p���W�X�^		*/
    "LR_M08",	//					/* [25] MACLOCAL�p���W�X�^		*/
    "LR_M09",	//					/* [26] MACLOCAL�p���W�X�^		*/
    "LR_M10",	//					/* [27] MACLOCAL�p���W�X�^		*/	// 170
    "LR_M11",	//					/* [28] MACLOCAL�p���W�X�^		*/
    "LR_M12",	//					/* [29] MACLOCAL�p���W�X�^		*/
    "LR_M13",	//					/* [30] MACLOCAL�p���W�X�^		*/
    "LR_M14",	//					/* [31] MACLOCAL�p���W�X�^		*/
    "LR_M15",	//					/* [32] MACLOCAL�p���W�X�^		*/
    "LR_COCORO_ILLUST",	//			/* [33] �����̃C���X�g			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LR_M16",	//					/* [34] MACLOCAL�p���W�X�^		*/
    "LR_M17",	//					/* [35] MACLOCAL�p���W�X�^		*/
    "LR_CHAPTER",	//				/* [36]	�`���v�^			*/
    "LR_SATORU_EP",	//				/* [37]	��G�s���[�O����		*/	// 180
    "LR_SHORTCUT_CO",	//				/* [38]	�V���[�g�J�b�g������p	*/
    "LR_SHORTCUT_SA",	//				/* [39]	�V���[�g�J�b�g������p	*/
    "LR_END_SATORU_EP",	//			/* [40]	�O��v���C���ʗp		*/
    "LR_M18",	//					/* [41] MACLOCAL�p���W�X�^		*/
    "LR_M19",	//					/* [42] MACLOCAL�p���W�X�^		*/
    "LR_M20",	//					/* [43] MACLOCAL�p���W�X�^		*/
    "LR_M21",	//					/* [44] MACLOCAL�p���W�X�^		*/
    "LR_W00",	//					/* [45] �Ȃɂ���H			*/
    "LR_G00",	//					/* [46] MACLOCAL�p���W�X�^�Q		*/
    "LR_TIMEPOINT",	//				/* [47] �^�C���|�C���g			*/	// 190
    "LR_MAX",	//
/************************************************************************************************/
/* ���[�J���t���O										*/
/************************************************************************************************/
/*SYSTEM*/
    "LF_T00",	//=LOC_FLG_START,			/* [00] �e���|�����t���O�O�O		*/
    "LF_T01",	//					/* [01] �e���|�����t���O�O�P		*/
    "LF_T02",	//					/* [02] �e���|�����t���O�O�Q		*/
    "LF_T03",	//					/* [03] �e���|�����t���O�O�R		*/
    "LF_04",	//					/* [04] 				*/
    "LF_05",	//					/* [05] 				*/
    "LF_06",	//					/* [06] 				*/
    "LF_07",	//					/* [07] 				*/
    "LF_08",	//					/* [08] 				*/	// 200
    "LF_09",	//					/* [09] 				*/
    "LF_10",	//					/* [10] 				*/
    "LF_11",	//					/* [11] 				*/
    "LF_12",	//					/* [12] 				*/
    "LF_13",	//					/* [13] 				*/
    "LF_14",	//					/* [14] 				*/
    "LF_15",	//					/* [15] 				*/
/*SCRIPT*/
    "LF_COCORO_UNI_ROOM",	//			/* [16] ��ɂ̕����ɍs����		*/	/* ������P����	*/
    "LF_COCORO_EXIT",	//				/* [17] ��x�\�ɏo��			*/	/* ������P����	*/
    "LF_COCORO_INUBUSHI",	//			/* [18] �����ɉ����			*/	/* ������P����	*/ // 210
    "LF_COCORO_NEZUMI",	//			/* [19] �l�Y�~�����			*/	/* ������P����	*/
    "LF_COCORO_COCORO",	//			/* [20] �����낾�Ƒi����		*/	/* ������P����	*/
    "LF_COCORO_WHO",	//				/* [21] ���Ȃ��͒N			*/	/* ������P����	*/
    "LF_COCORO_DOUBT",	//			/* [22] �����������������ɉ��^		*/	/* ������P����	*/
    "LF_COCORO_KANPAN",	//			/* [23] �J���p���H�ׂ�			*/	/* ������P����	*/
    "LF_COCORO_SUIMINYAKU",	//			/* [24] ���������łȂ�		*/	/* ������P����	*/
    "LF_COCORO_SYOKUJI",	//			/* [25] �R���ڂƂS���ڃX�t�B�A�ŐH�ׂ�	*/	/* ������R����	*/
    "LF_COCORO_SETSUMEI",	//			/* [26] ��ɍs������������		*/	/* ������R����	*/
    "LF_COCORO_TESOU",	//			/* [27] ��ɂɎ葊�����Ė����		*/	/* ������R����	*/
    "LF_COCORO_KANRI_LIN",	//			/* [28] �H���͑Ⴊ�Ǘ�			*/	/* ������S����	*/ // 220
    "LF_COCORO_KABEZOI",	//			/* [29] �ǂɉ����ĕ�����		*/	/* ������S����	*/
    "LF_COCORO_SPHIA",	//			/* [30] �X�t�B�A�ő����		*/	/* ������S����	*/
    "LF_COCORO_YOMOGI_1",	//			/* [31] ����؂�u���Ă�����		*/	/* ������T����	*/
    "LF_COCORO_YOMOGI_2",	//			/* [32] ����؂ɔw���킹��		*/	/* ������T����	*/
    "LF_COCORO_TOUSHI_UNI",	//			/* [33] ��ɒ�̉��ǂŎ��S		*/	/* ������T����	*/
    "LF_COCORO_TOUSI_COCORO",	//			/* [34] ���̌���œ���			*/	/* ������T����	*/
    "LF_COCORO_UNI",	//				/* [35] ��ɒ�̉��ǂŎ��S		*/	/* ������T����	*/
    "LF_SATORU_HOTORI",	//			/* [36] �䒹�����Ɛ�����		*/	/* ��P����	*/
    "LF_SATORU_HAL",	//				/* [37] �����o�����Ȃ�			*/	/* ��P����	*/
    "LF_SATORU_UTSUMI",	//			/* [38] ���v��ɓo�������R��q�˂�	*/	/* ��P����	*/	// 230
    "LF_SATORU_BLACK",	//			/* [39] �u���b�N�����D��		*/	/* ��Q����	*/
    "LF_SATORU_TOKEIDAI",	//			/* [40] ���v��ɓo����			*/	/* ��Q����	*/
    "LF_SATORU_SYOKUYOKU",	//			/* [41] �H�~����			*/	/* ��Q����	*/
    "LF_SATORU_UNI_ROOM",	//			/* [42] ��ɕ���			*/	/* ��Q����	*/
    "LF_SATORU_INUBUSHI_ROOM",	//		/* [43] ��������			*/	/* ��Q����	*/
    "LF_SATORU_YOMOGI",	//			/* [44] ����؂�̖��O�ɕ����o���Ȃ�	*/	/* ��Q����	*/
    "LF_SATORU_SNOWBOARD",	//			/* [45] �X�m�{				*/	/* ��R����	*/
    "LF_SATORU_BASKET",	//			/* [46] �o�X�P				*/	/* ��R����	*/
    "LF_SATORU_2PL",	//				/* [47] ��ɂQ�o�k			*/	/* ��R����	*/
    "LF_SATORU_WIN",	//				/* [48] �䒹�Ƀo�X�P�ŏ�����		*/	/* ��R����	*/ // 240
    "LF_SATORU_LOSE",	//				/* [49] �䒹�Ƀo�X�P�ŕ�����		*/	/* ��R����	*/
    "LF_SATORU_COFFEE4",	//			/* [50] �R�[�q�[���񂾁i4���ځj		*/	/* ��S����	*/
    "LF_SATORU_KILL",	//				/* [51] �䒹���E������			*/	/* ��T����	*/
    "LF_SATORU_HANNIN",	//			/* [52] �䒹���E���������Ɛl���Ǝv���Ă�*/	/* ��T����	*/
    "LF_SATORU_TOBIRIN",	//			/* [53] �g�r�����Ԃ�����		*/	/* ��T����	*/
    "LF_SATORU_BETSUJIN",	//			/* [54] �����ƕ䒹�͕ʐl�̘b���o��	*/	/* ��U����	*/
    "LF_SATORU_TRUE",	//				/* [55] �R�_�ԓ]�ڂɋC�t���Ă���	*/	/* ��V����	*/
    "LF_SATORU_TENI4",	//			/* [56] �S�_�ԓ]�ڂ𐄗�		*/	/* ��V����	*/
    "LF_M00",	//					/* [57]	UV�p�t���O			*/
    "LF_M01",	//					/* [58]	UV�p�t���O			*/	// 250
    "LF_M02",	//					/* [59]	UV�p�t���O			*/
    "LF_M03",	//					/* [60]	UV�p�t���O			*/
    "LF_M04",	//					/* [61]	UV�p�t���O			*/
    "LF_M05",	//					/* [62]	UV�p�t���O			*/
    "LF_COCORO_MAGURO",	//			/* [63] �i�{�[�������ꂽ		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_COCORO_HUTAGO",	//			/* [64] ��ɑo�q��			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_COCORO_KANRI_COCORO",	//			/* [65] �H���������낪�Ǘ�		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_SATORU_NAYAMU",	//			/* [66] �ƂĂ��Y��			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_SATORU_COFFEE",	//			/* [67] �Q���ڂɃR�[�q�[����łȂ�	*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_SATORU_COCORO_LIVE",	//			/* [68] �����낪�����Ă��Ă���Ċ�����	*/	/* �o�C�I�Q�Ɨp���p	*/ // 260
    "LF_SATORU_GURUGURU",	//			/* [69] ��Ƃ��邮��b���ĂȂ�		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_SUIMINYAKU",	//		/* [70] ���������łȂ�		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_SYOKUJI",	//			/* [71] �R���ڂƂS���ڃX�t�B�A�ŐH�ׂ�	*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_ENOMOTO",	//			/* [72] �|�{�ɎE�����			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_SPHIA",	//			/* [73] �X�t�B�A�ő����		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_LIN_1",	//			/* [74] �ᔭ���`			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_YOMOGI",	//			/* [75] ����ؔ���			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_LIN_2",	//			/* [76] �ᔭ���a			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_LIN_3",	//			/* [77] �ᔭ���b			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_AKEKURA",	//			/* [78] ��q�ő���			*/	/* �o�C�I�Q�Ɨp���p	*/ // 270
    "LF_BAD_COCORO_TOUSI_COCORO",	//		/* [79] ���̌���œ���			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_UNI",	//			/* [80] ��ɒ�̉��ǂŎ��S		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_7A",	//			/* [81] ������7���ڂŎ��S�`		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_COCORO_7B",	//			/* [82] ������7���ڂŎ��S�a		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_SATORU_BAD",	//			/* [83] ��o�b�h�G���h�`		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_SATORU_MIZU",	//			/* [84] ������ła�`�c			*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_SATORU_YUBI",	//			/* [85] �w��΂���Ăa�`�c		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_BAD_SATORU_ROLLBAD",	//			/* [86] ���[���L��a�`�c		*/	/* �o�C�I�Q�Ɨp���p	*/
    "LF_M06",	//					/* [87]	UV�p�t���O			*/
    "LF_MAX",	//	 // 280

    "REG_TITLE",
    "REG_ROUTE",
    "REG_DATE0",
    "REG_DATE1",
    "REG_BG0",
    "REG_CHARA0",
    "REG_CHARA1",
    "REG_CHARA2",
    "REG_CHARA0_X",
    "REG_CHARA1_X",
    "REG_CHARA2_X",
    "REG_EFFECT",	// 290
    "REG_HANA",
    "REG_RAIN",
    "REG_WAVE",
    "REG_SELECT_MES",
    "REG_BGM",
    "REG_FILTER",
    "REG_QUA",	// 297
    "REG_WINCOL",
    "REG_SELOOP",
    "REG_FILTCOLOR",
    "REG_FILTALPHA",
    "REG_BLINK",
];
var REGSound = "REG_SOUND";
