use crs
GO
SET IDENTITY_INSERT function_normalizers ON
INSERT INTO function_normalizers (id, _function ,id_indicator) VALUES
(1, 'x', 41),
(2, '1.64685+x*(69.1707+x*(-238.855+x*(294.726+x*(-158.8+32.0513*x))))', 42),

SET IDENTITY_INSERT function_normalizers OFF
GO