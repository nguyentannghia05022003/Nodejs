import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { BadRequestError } from '../../utils/error';

export class UploadController {
    uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                throw new BadRequestError('Vui lòng chọn file ảnh');
            }

            const fileUrl = `/uploads/${req.file.filename}`;

            return responseUtil.success(
                res,
                {
                    url: fileUrl,
                    filename: req.file.filename,
                    originalname: req.file.originalname,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                },
                'Upload avatar thành công'
            );
        } catch (error) {
            next(error);
        }
    };

    uploadProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                throw new BadRequestError('Vui lòng chọn file ảnh');
            }

            const fileUrl = `/uploads/${req.file.filename}`;

            return responseUtil.success(
                res,
                {
                    url: fileUrl,
                    filename: req.file.filename,
                    originalname: req.file.originalname,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                },
                'Upload ảnh sản phẩm thành công'
            );
        } catch (error) {
            next(error);
        }
    };
}

