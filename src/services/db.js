import { 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  doc, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// ==========================================
// CLIENTES
// ==========================================
export const subscribeClientes = (callback, onError) => {
  const q = query(collection(db, 'clientes'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(list);
  }, (err) => {
    console.error("Erro ao escutar clientes:", err);
    if (onError) onError(err);
  });
};

export const addCliente = async (clienteData) => {
  return await addDoc(collection(db, 'clientes'), {
    ...clienteData,
    createdAt: serverTimestamp()
  });
};

export const deleteCliente = async (id) => {
  return await deleteDoc(doc(db, 'clientes', id));
};

export const updateCliente = async (id, data) => {
  return await updateDoc(doc(db, 'clientes', id), data);
};

// ==========================================
// ORÇAMENTOS
// ==========================================
export const subscribeOrcamentos = (callback, onError) => {
  const q = query(collection(db, 'orcamentos'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(list);
  }, (err) => {
    console.error("Erro ao escutar orçamentos:", err);
    if (onError) onError(err);
  });
};

export const addOrcamento = async (orcamentoData) => {
  return await addDoc(collection(db, 'orcamentos'), {
    ...orcamentoData,
    createdAt: serverTimestamp()
  });
};

export const updateOrcamentoStatus = async (id, status) => {
  return await updateDoc(doc(db, 'orcamentos', id), { status });
};

export const updateOrcamentoValor = async (id, valor) => {
  return await updateDoc(doc(db, 'orcamentos', id), { valor: Number(valor) });
};

export const updateOrcamento = async (id, data) => {
  return await updateDoc(doc(db, 'orcamentos', id), data);
};

export const deleteOrcamento = async (id) => {
  return await deleteDoc(doc(db, 'orcamentos', id));
};

export const solicitarOrcamentoViaSite = async (dados) => {
  // Salva na coleção de orçamentos como pendente vindo do site
  const orcamentoRef = await addDoc(collection(db, 'orcamentos'), {
    cliente: dados.nome,
    telefone: dados.telefone || '',
    cidade: dados.cidade || '',
    servico: dados.servico || 'Solicitação Geral',
    detalhes: dados.detalhes || '',
    valor: 0,
    status: 'Pendente',
    origem: 'Site',
    data: new Date().toLocaleDateString('pt-BR'),
    createdAt: serverTimestamp()
  });

  // Também registra na lista de clientes se tiver nome
  if (dados.nome) {
    try {
      await addDoc(collection(db, 'clientes'), {
        nome: dados.nome,
        telefone: dados.telefone || '',
        email: dados.email || '',
        endereco: dados.cidade || '',
        totalServicos: 1,
        origem: 'Lead do Site',
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.warn("Não foi possível salvar cliente automático:", e);
    }
  }

  return orcamentoRef;
};

// ==========================================
// AGENDAMENTOS (AGENDA)
// ==========================================
export const subscribeAgendamentos = (callback, onError) => {
  const q = query(collection(db, 'agendamentos'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(list);
  }, (err) => {
    console.error("Erro ao escutar agendamentos:", err);
    if (onError) onError(err);
  });
};

export const addAgendamento = async (agendamentoData) => {
  return await addDoc(collection(db, 'agendamentos'), {
    ...agendamentoData,
    createdAt: serverTimestamp()
  });
};

export const updateAgendamentoStatus = async (id, status) => {
  return await updateDoc(doc(db, 'agendamentos', id), { status });
};

export const updateAgendamento = async (id, data) => {
  return await updateDoc(doc(db, 'agendamentos', id), data);
};

export const deleteAgendamento = async (id) => {
  return await deleteDoc(doc(db, 'agendamentos', id));
};

// ==========================================
// SEED INICIAL (CARREGAR EXEMPLOS REAIS NO FIRESTORE)
// ==========================================
export const seedInitialFirestoreData = async () => {
  const sampleClientes = [
    { nome: 'Maria Oliveira', telefone: '(19) 98888-1111', email: 'maria.oliveira@email.com', endereco: 'Cond. Vila Flora - Bloco B', totalServicos: 3 },
    { nome: 'Carlos Silva', telefone: '(19) 97777-2222', email: 'carlos.silva@email.com', endereco: 'Rua das Flores, 123 - Centro', totalServicos: 1 },
    { nome: 'Clínica Sorriso', telefone: '(19) 3800-3333', email: 'contato@clinicasorriso.com', endereco: 'Av. Brasil, 456 - Jd. Amanda', totalServicos: 12 },
  ];

  for (const c of sampleClientes) {
    await addCliente(c);
  }

  const sampleOrcamentos = [
    { numero: '1043', cliente: 'Roberto Mendes', servico: 'Instalação Piso Teto 36k', data: '20/09/2026', valor: 1200, status: 'Aprovado' },
    { numero: '1042', cliente: 'Clínica Sorriso', servico: 'Contrato Manutenção Mensal', data: '18/09/2026', valor: 800, status: 'Enviado' },
    { numero: '1041', cliente: 'Maria Oliveira', servico: 'Limpeza 2x Split 9k', data: '15/09/2026', valor: 300, status: 'Aprovado' },
  ];

  for (const o of sampleOrcamentos) {
    await addOrcamento(o);
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const sampleAgendamentos = [
    { cliente: 'Maria Oliveira', servico: 'Instalação (12.000 BTUs)', endereco: 'Cond. Vila Flora - Bloco B', data: todayStr, hora: '09:00', status: 'confirmado' },
    { cliente: 'Carlos Silva', servico: 'Manutenção Corretiva', endereco: 'Rua das Flores, 123', data: todayStr, hora: '14:30', status: 'confirmado' },
  ];

  for (const a of sampleAgendamentos) {
    await addAgendamento(a);
  }
};

