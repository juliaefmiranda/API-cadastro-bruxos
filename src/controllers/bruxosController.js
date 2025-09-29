import dados from "./../models/dados.js";

const { bruxos } = dados;

const getAllBruxos = (req, res) => {
  let resultado = bruxos;

  const { casa } = req.query;

  if (casa) {
    resultado = resultado.filter(b => b.casa.toLowerCase().includes(casa.toLowerCase()));
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: "Lista de bruxos convocada com sucesso!",
    total: resultado.length,
    data: resultado,
  });
};

const getBruxoById = (req, res) => {
  const id = parseInt(req.params.id);

  const bruxo = bruxos.find((b) => b.id === id);

  if (!bruxo) {
    res.status(404).json({
      status: 404,
      success: false,
      message: "Bruxo não encontrado no Beco Diagonal!",
      error: "WIZARD_NOT_FOUND",
      suggestions: [
        "Verifique se o bruxo está registrado",
        "Cheque se o nome está correto",
      ],
    });
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: "Lista de bruxos por Id convocada com sucesso!",
    data: bruxo,
  });
};

const createBruxo = (req, res) => {
const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo, varinha } = req.body;
const nomeExiste = bruxos.find(b => b.nome.toLowerCase() === nome.toLowerCase());

const casasOficiais = ["Grifinoria", "Sonserina", "Corvinal", "Lufa-Lufa"];

  if (!nome) {
    return res.status(400).json({
      status: 400,
      sucess: false,
      message: "Feitiço mal executado, verifique os ingredientes!",
      error: "VALIDATION_ERROR",
      details: "O campo nome deve ser preenchido!",
    });
  };

  if (!casasOficiais.includes(casa)) {
    return res.status(400).json({
        status: 400,
        success: false,
        message: "A casa deve ser uma das quatro oficiais!"
    });
  }

  if (varinha.length < 3) {
    return res.status(400).json({
      status: 400,
      success: false,
      messsage: "A varinha não pode ter menos de 3 caracteres!"
    });
  }

  const novoBruxo = {
    id: bruxos.length + 1,
    nome: nome,
    casa: casa,
    anoNascimento: parseInt(anoNascimento),
    especialidade: especialidade,
    nivelMagia: nivelMagia,
    ativo: ativo,
  };

  bruxos.push(novoBruxo);

    if (nomeExiste) {
        return res.status(409).json({
            status: 409,
            success: false,
            message: "Já existe um bruxo com esse nome!",
            error: "DUPLICATE_WIZARD",
            suggestions: "Altere o nome do bruxo"
        });
    }

    res.status(201).json({
    status: 201,
    success: true,
    message: "Bruxo matriculado em Hogwarts com sucesso!",
    data: bruxos,
  });
};

const deleteBruxo = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "O ID deve ser válido!",
    });
  }

  const bruxoParaRemover = bruxos.find((b) => b.id === id);

  if (!bruxoParaRemover) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: `Bruxo com id ${id} não existe!`,
    });
  }

  const bruxosFiltrados = bruxos.filter((bruxo) => bruxo.id != id);

  bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

  res.status(200).json({
    status: 200,
    success: true,
    message: "Bruxo expulso de Hogwarts com sucesso!",
  });
};

const updateBruxo = (req, res) => {
const { id } = req.params;
const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } =
    req.body;
const casasOficiais = ["Grifinoria", "Sonserina", "Corvinal", "Lufa-Lufa"];

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "ID deve ser um número válido!",
    });
  }

    if (!nome) {
    return res.status(400).json({
      status: 400,
      sucess: false,
      message: "Feitiço mal executado, verifique os ingredientes!",
      error: "VALIDATION_ERROR",
      details: "O campo nome deve ser preenchido!",
    });
  };

  if (!casasOficiais.includes(casa)) {
    return res.status(400).json({
        status: 400,
        success: false,
        message: "A casa deve ser uma das quatro oficiais!"
    });
  }

  const idParaEditar = parseInt(id);

  const bruxoExiste = bruxos.find((b) => b.id === idParaEditar);
  if (!bruxoExiste) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Não é possível modificar um bruxo que não existe!",
      error: "WIZARD_NOT_FOUND"
    });
  }

  const bruxosAtualizados = bruxos.map((bruxo) =>
    bruxo.id === idParaEditar
      ? {
          ...bruxo,
          ...(nome && { nome }),
          ...(casa && { casa }),
          ...(anoNascimento && { anoNascimento: parseInt(anoNascimento) }),
          ...(especialidade && { especialidade }),
          ...(nivelMagia && { nivelMagia }),
          ...(ativo !== undefined && { ativo }),
        }
      : bruxo
  );

  bruxos.splice(0, bruxos.length, ...bruxosAtualizados);

  const bruxoAtualizado = bruxos.find((b) => b.id === idParaEditar);

  res.status(200).json({
    status: 200,
    success: true,
    message: "Bruxo atualizado com sucesso!",
    bruxo: bruxoAtualizado,
  });
};

export { getAllBruxos, getBruxoById, createBruxo, deleteBruxo, updateBruxo };
