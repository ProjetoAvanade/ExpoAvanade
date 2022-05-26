USE dbgp11;
GO

--TIPO USUARIO
INSERT INTO tipoUsuario (tipoUsuario)
VALUES	
		('Administrador'),
		('Cliente');
GO

Select * From tipoUsuario;
GO

--USUARIOS
INSERT INTO usuarios(idTipoUsuario,nomeUsuario,email,senha,dataNascimento,cpf, saldo, pontos)
VALUES	
(2,'paulo','paulo@gmail.com','fernando123','2004-12-24',000007779, 0, 30)
GO

Select * From usuarios;
GO

--BICICLETARIO
INSERT INTO bicicletarios(nome,rua,numero,bairro,cidade,cep,horarioAberto,horarioFechado,latitude,longitude)
VALUES
('Bicicletário SCSS','Centroo',7000,'bairro trs','SCS','3333323313','06:00:00.0000000','21:59:59.9999999','-23.372310','-46.33430');
GO

SELECT * FROM bicicletarios
GO;

INSERT INTO vagas(idBicicletario,statusVaga)
VALUES(3, 0),
(3,1),
(3,0),
(3,0),
(3,0)
GO

SELECT * FROM bicicletarios
GO;

set dateformat ymd;
GO

INSERT INTO reservas(idUsuario,idVaga,abreTrava, fechaTrava, preco, statusPagamento)
VALUES(2, 4, '2022-05-25 22:09:00.000', '2022-05-25 23:09:00.000', 5.00, 1);
GO

SELECT * FROM reservas
GO;