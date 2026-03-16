-- Atualiza a quantidade de produtos depois de inserir um item em pedido.

DELIMITER $$

CREATE TRIGGER trg_atualiza_qtd_produto
AFTER INSERT ON ItensPedido
FOR EACH ROW
BEGIN
    UPDATE Produtos
    SET qtd = qtd - NEW.qtd
    WHERE Id = NEW.IdProduto;
END$$

DELIMITER ;

-- Armazena o valor atual do produtos, em itensPedido

DELIMITER $$

CREATE TRIGGER trg_valor_produto_item
BEFORE INSERT ON ItensPedido
FOR EACH ROW
BEGIN
    SET NEW.valorUni = (
        SELECT valor
        FROM Produtos
        WHERE id = NEW.idProduto
    );
END$$

DELIMITER ;

-- Atualiza o valor do pedido, todas as vezes que um item é adicionado

DELIMITER $$

CREATE TRIGGER trg_atualiza_valor_pedido
AFTER INSERT ON ItensPedido
FOR EACH ROW
BEGIN
    UPDATE Pedidos
    SET valorTotal = IFNULL(valorTotal,0) + (NEW.qtd * NEW.valorUni)
    WHERE id = NEW.idPedido;
END$$

DELIMITER ;

--------------------------
-- Atualiza o valor Total apos uma atualização

DELIMITER $$

CREATE TRIGGER trg_atualiza_valor_pedido_after_update_qtditens
AFTER UPDATE ON ItensPedido
FOR EACH ROW
BEGIN
    -- subtrai o valor antigo
    UPDATE Pedidos
    SET valorTotal = IFNULL(valorTotal,0) - (OLD.qtd * OLD.valorUni)
    WHERE id = OLD.idPedido;

    -- adiciona o novo valor
    UPDATE Pedidos
    SET valorTotal = IFNULL(valorTotal,0) + (NEW.qtd * NEW.valorUni)
    WHERE id = NEW.idPedido;
END$$

DELIMITER ;

