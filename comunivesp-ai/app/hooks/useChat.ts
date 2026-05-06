"use client";

import { useState, useCallback } from "react";

export type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
};

// Enhanced knowledge base extracted from MANUAL-DO-ALUNO.md and CALENDARIO-DE-PROVAS.md
const KNOWLEDGE_BASE = [
  {
    keywords: ["média", "nota", "avaliação", "pontuação", "exame", "final", "bimestre"],
    response: "Nas disciplinas bimestrais da Univesp, a avaliação funciona assim:\n\n" +
              "• 40% da nota: Atividades avaliativas semanais no AVA.\n" +
              "• 60% da nota: Prova presencial no polo.\n\n" +
              "Se você não atingir a média 6.0, poderá realizar o Exame Final. A média após o exame é: (Média Anterior + Nota do Exame) / 2. O resultado deve ser pelo menos 6.0 para aprovação."
  },
  {
    keywords: ["calendário", "datas", "provas", "maio", "junho", "2026", "exames", "segunda chamada"],
    response: "Aqui estão as principais datas do calendário de provas de 2026 (2º Bimestre):\n\n" +
              "• 18/05 a 29/05: Provas Regulares do 2º Bimestre (Presenciais no Polo).\n" +
              "• 10/06: Segunda Chamada para alunos com requerimentos aprovados.\n\n" +
              "Horário padrão: 18h às 22h.\n\n" +
              "Para detalhes por disciplina ou curso, consulte o link oficial: https://apps.univesp.br/manual-do-aluno/calendario-provas"
  },
  {
    keywords: ["computação", "data", "prova", "escalável", "estratégico"],
    response: "Para Engenharia de Computação (2022) e Ciência de Dados (2022) no 2º Bimestre de 2026:\n\n" +
              "• 18/05 ou 26/05: Computação Escalável (COM460) e Planejamento Estratégico (COM470).\n" +
              "• 20/05 ou 26/05: Programação Orientada a Objetos (COM230).\n\n" +
              "Verifique sempre o AVA para a confirmação da data específica da sua turma."
  },
  {
    keywords: ["pedagogia", "letras", "matemática", "data", "prova"],
    response: "Datas de provas para Licenciaturas (2º Bimestre 2026):\n\n" +
              "• 18/05: Fundamentos da Ed. Infantil II (Pedagogia), Linguagem e Significação (Letras), Planejamento para o Ensino de Matemática (Matemática).\n" +
              "• 19/05: Filosofia da Educação e Sociologia da Educação.\n" +
              "• 20/05: Lógica e Matemática Discreta, Gêneros Narrativos.\n\n" +
              "Confira o horário e local no seu polo de apoio presencial."
  },
  {
    keywords: ["pi", "projeto integrador", "grupo", "vídeo", "relatório"],
    response: "O Projeto Integrador (PI) é uma atividade semestral focada em contextos práticos. A avaliação consiste em:\n\n" +
              "• 40%: Planos de ação e relatório parcial.\n" +
              "• 60%: Relatório final e vídeo de apresentação.\n\n" +
              "Atenção: A correção do relatório final depende da entrega do vídeo!"
  },
  {
    keywords: ["tcc", "trabalho de conclusão", "formatura", "banca"],
    response: "Para cursar o TCC na Univesp, você precisa ter concluído no mínimo 62,5% da carga horária total do curso (exceto Gestão Pública). A avaliação é dividida em:\n\n" +
              "• 30%: Entregas parciais formativas.\n" +
              "• 70%: Trabalho escrito final e defesa perante a banca examinadora."
  },
  {
    keywords: ["ava", "fórum", "ambiente virtual", "módulo", "estudo"],
    response: "O AVA (Ambiente Virtual de Aprendizagem) organiza as disciplinas em módulos semanais. Existem dois tipos de fóruns:\n\n" +
              "1. Fórum de Dúvidas: Presente toda semana para questões sobre o conteúdo.\n" +
              "2. Fórum Temático: Eventual, proposto pelo professor para troca de experiências específicas.\n\n" +
              "Materiais-base são obrigatórios para as provas; materiais de apoio são complementares."
  },
  {
    keywords: ["suporte", "ajuda", "contato", "polo", "sra", "sae", "comunicação"],
    response: "Existem canais específicos para cada necessidade:\n\n" +
              "• Dúvidas Pedagógicas (Conteúdo/AVA): Mediador ou Facilitador no AVA.\n" +
              "• Administrativo (Declarações/Matrícula): Orientador de Polo.\n" +
              "• Suporte aos Sistemas/Elogios/Reclamações: SAE (http://atendimento.univesp.br/sae/portal.html).\n" +
              "• Diplomas e Históricos: SRA (Secretaria de Registro Acadêmico)."
  },
  {
    keywords: ["abnt", "normas", "formatação", "trabalho", "referência"],
    response: "A Univesp possui um manual específico para normalização de trabalhos acadêmicos (PI e TCC). Você pode acessar o guia de normas ABNT atualizado aqui: https://assets.univesp.br/blackboard/normas-abnt-2023.pdf"
  }
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "ai",
      content: "Olá! Sou o assistente virtual da Univesp. Já carreguei o Calendário de Provas de Maio/Junho de 2026. Posso te informar as datas das avaliações, prazos de PI/TCC ou regras de aprovação. Qual sua dúvida?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const lowerContent = content.toLowerCase();
      const matches = KNOWLEDGE_BASE.filter(k => k.keywords.some(kw => lowerContent.includes(kw)));
      
      let responseContent = "";
      
      if (matches.length > 0) {
        responseContent = matches.map(m => m.response).join("\n\n---\n\n");
      } else {
        responseContent = "Ainda não encontrei uma resposta específica para essa pergunta no Calendário 2026 ou no Manual do Aluno. \n\n" +
                          "Tente pesquisar por 'provas de maio', 'data de exame', 'média G1' ou o nome do seu curso.\n\n" +
                          "Consulte o manual completo em: https://univesp.br/manual-do-aluno";
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 700);
  }, []);

  return { messages, sendMessage, isTyping };
}
