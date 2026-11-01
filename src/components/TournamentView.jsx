import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tournamentService } from '../services/tournamentService';
import { 
  ArrowLeft, LogOut, Trophy, Search, ZoomIn, ZoomOut, RotateCcw, 
  Calendar, MapPin, Users, CheckCircle2, ShieldCheck, Edit3, Save, X, RefreshCw
} from 'lucide-react';
import './TournamentView.css';

const INITIAL_TOURNAMENT_DATA = {
  id: 'torneo-oficial-2026',
  name: 'Torneo Oficial Club Tenis 2026',
  category: 'Primera Categoría',
  surface: 'Arcilla (Sede Central)',
  dates: 'Octubre - Noviembre 2026',
  status: 'Finalizado',
  champion: {
    name: 'Jugador 13',
    points: '2,000 PTS',
    sets: '7-5, 3-6, 6-4 en la Final',
    runnerUp: 'Jugador 1',
    runnerUpPoints: '1,200 PTS'
  },
  rounds: [
    {
      id: 'r16',
      name: 'Octavos de Final',
      points: '180 PTS',
      matches: [
        {
          id: 'm1',
          scoreType: 'bye',
          player1: { name: 'Jugador 1', sets: ['Bye'], isWinner: true },
          player2: { name: '— (Pase directo)', sets: [''], isWinner: false },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm2',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 3', sets: ['6', '6'], isWinner: true },
          player2: { name: 'Jugador 4', sets: ['0', '1'], isWinner: false },
          court: 'Cancha 1',
          status: 'Finalizado'
        },
        {
          id: 'm3',
          scoreType: 'wo',
          player1: { name: 'Jugador 5', sets: ['W.O.'], isWinner: false },
          player2: { name: 'Jugador 6', sets: ['W.O.'], isWinner: true },
          court: 'Cancha 2',
          status: 'Finalizado'
        },
        {
          id: 'm4',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 7', sets: ['2', '1'], isWinner: false },
          player2: { name: 'Jugador 8', sets: ['6', '6'], isWinner: true },
          court: 'Cancha 3',
          status: 'Finalizado'
        },
        {
          id: 'm5',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 9', sets: ['1', '3'], isWinner: false },
          player2: { name: 'Jugador 10', sets: ['6', '6'], isWinner: true },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm6',
          scoreType: 'sets',
          setsCount: 3,
          player1: { name: 'Jugador 11', sets: ['6', '3', '6'], isWinner: true },
          player2: { name: 'Jugador 12', sets: ['3', '6', '4'], isWinner: false },
          court: 'Cancha 1',
          status: 'Finalizado'
        },
        {
          id: 'm7',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 13', sets: ['6', '6'], isWinner: true },
          player2: { name: 'Jugador 14', sets: ['2', '3'], isWinner: false },
          court: 'Cancha 2',
          status: 'Finalizado'
        },
        {
          id: 'm8',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 15', sets: ['6', '6'], isWinner: true },
          player2: { name: 'Jugador 16', sets: ['0', '2'], isWinner: false },
          court: 'Cancha 3',
          status: 'Finalizado'
        }
      ]
    },
    {
      id: 'qf',
      name: 'Cuartos de Final',
      points: '360 PTS',
      matches: [
        {
          id: 'm9',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 1', sets: ['6', '6'], isWinner: true },
          player2: { name: 'Jugador 3', sets: ['3', '4'], isWinner: false },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm10',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 6', sets: ['2', '1'], isWinner: false },
          player2: { name: 'Jugador 8', sets: ['6', '6'], isWinner: true },
          court: 'Cancha 1',
          status: 'Finalizado'
        },
        {
          id: 'm11',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 10', sets: ['6', '6'], isWinner: true },
          player2: { name: 'Jugador 11', sets: ['4', '3'], isWinner: false },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm12',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 13', sets: ['6', '6'], isWinner: true },
          player2: { name: 'Jugador 15', sets: ['1', '2'], isWinner: false },
          court: 'Cancha 2',
          status: 'Finalizado'
        }
      ]
    },
    {
      id: 'sf',
      name: 'Semifinal',
      points: '720 PTS',
      matches: [
        {
          id: 'm13',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 1', sets: ['6', '6'], isWinner: true },
          player2: { name: 'Jugador 8', sets: ['2', '4'], isWinner: false },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm14',
          scoreType: 'sets',
          setsCount: 2,
          player1: { name: 'Jugador 10', sets: ['3', '4'], isWinner: false },
          player2: { name: 'Jugador 13', sets: ['6', '6'], isWinner: true },
          court: 'Cancha Principal',
          status: 'Finalizado'
        }
      ]
    },
    {
      id: 'f',
      name: 'Final',
      points: '1,200 PTS',
      matches: [
        {
          id: 'm15',
          scoreType: 'sets',
          setsCount: 3,
          player1: { name: 'Jugador 1', sets: ['5', '6', '4'], isWinner: false },
          player2: { name: 'Jugador 13', sets: ['7', '3', '6'], isWinner: true },
          court: 'Cancha Principal',
          status: 'Finalizado'
        }
      ]
    }
  ]
};

// Helper para extraer lista limpia de sets de un jugador (soporta retrocompatibilidad)
export const getPlayerSets = (player) => {
  if (!player) return [];
  if (Array.isArray(player.sets) && player.sets.length > 0) {
    return player.sets.map(s => String(s !== undefined && s !== null ? s : '').trim());
  }
  if (player.score) {
    const trimmed = String(player.score).trim();
    if (trimmed.includes(' ') || trimmed.includes(',')) {
      return trimmed.replace(/,/g, ' ').split(/\s+/).filter(Boolean);
    }
    return [trimmed];
  }
  return [];
};

const checkIsAdmin = (user) => {
  if (!user) return false;
  const name = (user.name || '').toLowerCase();
  const id = (user.id || '').toLowerCase();
  const dni = (user.dni || '').trim();
  return name.includes('aaron ayala') || id === 'aaronayala' || dni === '78135716';
};

const TournamentView = ({ onBack }) => {
  const { user, logout } = useAuth();
  const isAdmin = checkIsAdmin(user);

  const [tournament, setTournament] = useState(INITIAL_TOURNAMENT_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Modal para ver o editar partido
  const [activeMatch, setActiveMatch] = useState(null);
  const [editingMatchData, setEditingMatchData] = useState(null);

  // Modal para editar campeón
  const [isEditingChampion, setIsEditingChampion] = useState(false);
  const [championFormData, setChampionFormData] = useState(null);

  // Cargar datos en tiempo real de Firebase Firestore
  useEffect(() => {
    const unsubscribe = tournamentService.subscribeToTournament((data) => {
      if (data && data.rounds) {
        setTournament(data);
      } else {
        setTournament(INITIAL_TOURNAMENT_DATA);
      }
    });
    return () => unsubscribe();
  }, []);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const isPlayerHighlighted = (playerName) => {
    if (!searchTerm.trim()) return false;
    return playerName.toLowerCase().includes(searchTerm.toLowerCase().trim());
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  // Abrir modal de partido
  const handleMatchClick = (match) => {
    setActiveMatch(match);
    if (isAdmin && isEditMode) {
      const p1Sets = getPlayerSets(match.player1);
      const p2Sets = getPlayerSets(match.player2);
      const maxSets = Math.max(p1Sets.length, p2Sets.length, 2);
      const initialSetsCount = match.setsCount || (maxSets === 3 ? 3 : 2);

      const isBye = match.scoreType === 'bye' || p1Sets[0] === 'Bye' || match.player1.score === 'Bye';
      const isWO = match.scoreType === 'wo' || p1Sets[0] === 'W.O.' || p2Sets[0] === 'W.O.' || match.player1.score === 'W.O.';

      setEditingMatchData({
        ...match,
        scoreType: isBye ? 'bye' : isWO ? 'wo' : 'sets',
        setsCount: initialSetsCount,
        player1: {
          name: match.player1.name || '',
          set1: p1Sets[0] || '',
          set2: p1Sets[1] || '',
          set3: p1Sets[2] || '',
          isWinner: !!match.player1.isWinner
        },
        player2: {
          name: match.player2.name || '',
          set1: p2Sets[0] || '',
          set2: p2Sets[1] || '',
          set3: p2Sets[2] || '',
          isWinner: !!match.player2.isWinner
        }
      });
    }
  };

  // Guardar cambios de un partido
  const handleSaveMatchEdit = async () => {
    if (!editingMatchData) return;

    let p1Sets = [];
    let p2Sets = [];

    if (editingMatchData.scoreType === 'bye') {
      p1Sets = ['Bye'];
      p2Sets = [];
    } else if (editingMatchData.scoreType === 'wo') {
      p1Sets = editingMatchData.player1.isWinner ? ['W.O.'] : [''];
      p2Sets = editingMatchData.player2.isWinner ? ['W.O.'] : [''];
    } else {
      // Normal sets (2 o 3 sets)
      p1Sets = [editingMatchData.player1.set1 || '', editingMatchData.player1.set2 || ''];
      p2Sets = [editingMatchData.player2.set1 || '', editingMatchData.player2.set2 || ''];
      if (editingMatchData.setsCount === 3) {
        p1Sets.push(editingMatchData.player1.set3 || '');
        p2Sets.push(editingMatchData.player2.set3 || '');
      }
    }

    const finalMatch = {
      ...editingMatchData,
      scoreType: editingMatchData.scoreType,
      setsCount: editingMatchData.setsCount,
      player1: {
        name: editingMatchData.player1.name,
        sets: p1Sets,
        score: p1Sets.filter(Boolean).join(' '),
        isWinner: editingMatchData.player1.isWinner
      },
      player2: {
        name: editingMatchData.player2.name,
        sets: p2Sets,
        score: p2Sets.filter(Boolean).join(' '),
        isWinner: editingMatchData.player2.isWinner
      }
    };

    const updatedRounds = tournament.rounds.map((round) => ({
      ...round,
      matches: round.matches.map((m) => (m.id === finalMatch.id ? finalMatch : m))
    }));

    const updatedTournament = {
      ...tournament,
      rounds: updatedRounds
    };

    setTournament(updatedTournament);
    setActiveMatch(null);
    setEditingMatchData(null);

    try {
      setSaving(true);
      await tournamentService.saveTournament(updatedTournament);
      showNotification('¡Resultado por sets guardado con éxito!');
    } catch (err) {
      console.error(err);
      showNotification('Error al guardar en Firebase: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Abrir modal de campeón
  const handleOpenEditChampion = () => {
    setChampionFormData({ ...tournament.champion });
    setIsEditingChampion(true);
  };

  // Guardar campeón
  const handleSaveChampion = async () => {
    if (!championFormData) return;

    const updatedTournament = {
      ...tournament,
      champion: championFormData
    };

    setTournament(updatedTournament);
    setIsEditingChampion(false);

    try {
      setSaving(true);
      await tournamentService.saveTournament(updatedTournament);
      showNotification('¡Datos del Campeón guardados con éxito!');
    } catch (err) {
      console.error(err);
      showNotification('Error al guardar en Firebase: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Restablecer torneo a inicial (solo admin)
  const handleResetToDefault = async () => {
    if (window.confirm('¿Seguro que deseas restablecer el torneo a Jugador 1..16?')) {
      try {
        setSaving(true);
        await tournamentService.saveTournament(INITIAL_TOURNAMENT_DATA);
        setTournament(INITIAL_TOURNAMENT_DATA);
        showNotification('Torneo restablecido a valores iniciales');
      } catch (err) {
        showNotification('Error al restablecer: ' + err.message, 'error');
      } finally {
        setSaving(false);
      }
    }
  };

  // Renderizar las cajitas de sets alineadas simétricamente
  const renderSetsBoxes = (player, otherPlayer) => {
    const sets = getPlayerSets(player);
    const otherSets = getPlayerSets(otherPlayer);

    if (sets.length === 0) return null;

    return (
      <div className="sets-container">
        {sets.map((setVal, idx) => {
          if (!setVal && !otherSets[idx]) return null;

          const otherVal = otherSets[idx] || '';
          const num1 = parseInt(setVal, 10);
          const num2 = parseInt(otherVal, 10);
          const isNumeric = !isNaN(num1) && !isNaN(num2);
          const isWon = isNumeric ? num1 > num2 : player.isWinner;
          const isSpecial = isNaN(num1);

          return (
            <span 
              key={idx} 
              className={`set-box ${isWon ? 'set-won' : ''} ${isSpecial ? 'set-special' : ''}`}
            >
              {setVal || '—'}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="tournament-layout">
      {/* Toast Notification */}
      {notification && (
        <div className={`tournament-toast ${notification.type}`}>
          {notification.msg}
        </div>
      )}

      {/* Navbar Superior */}
      <nav className="navbar" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} /> Volver
          </button>
          <div className="logo">
            <img src="/logo.webp" alt="Club Logo" style={{ height: '34px', objectFit: 'contain' }} />
            <span>Club</span> Tenis
          </div>
        </div>
        <div className="user-menu">
          <div className="user-info">
            <span>Hola, {user.name}</span>
            {isAdmin && (
              <span className="badge-admin-tag">
                <ShieldCheck size={14} /> Admin
              </span>
            )}
          </div>
          <button className="btn btn-secondary btn-sm" onClick={logout}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="tournament-main container">
        {/* Banner de Control Exclusivo para Administrador */}
        {isAdmin && (
          <div className="admin-control-bar card">
            <div className="admin-control-left">
              <ShieldCheck size={24} color="#059669" />
              <div>
                <strong>Panel de Edición de Torneos</strong>
                <p>Tienes permisos de Administrador para modificar los jugadores, cantidad de sets (2 o 3) y resultados de este torneo.</p>
              </div>
            </div>
            <div className="admin-control-actions">
              <button 
                className={`btn btn-sm ${isEditMode ? 'btn-edit-active' : 'btn-primary'}`}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                <Edit3 size={16} /> {isEditMode ? 'Salir de Modo Edición' : 'Activar Modo Edición'}
              </button>
              {isEditMode && (
                <button 
                  className="btn btn-secondary btn-sm btn-reset-data" 
                  onClick={handleResetToDefault}
                  disabled={saving}
                  title="Restablecer nombres a Jugador 1..16"
                >
                  <RefreshCw size={14} /> Restablecer
                </button>
              )}
            </div>
          </div>
        )}

        {/* Header Banner de Torneo */}
        <div className="tournament-header-card card">
          <div className="tournament-header-top">
            <div className="tournament-title-area">
              <div className="tournament-badge-row">
                <span className="badge badge-season">Temporada 2026</span>
                <span className="badge badge-status">
                  <CheckCircle2 size={13} /> {tournament.status}
                </span>
                {isEditMode && (
                  <span className="badge badge-editing">
                    <Edit3 size={13} /> Modo Edición Activo
                  </span>
                )}
              </div>
              <h1 className="tournament-title">{tournament.name}</h1>
              <p className="tournament-subtitle">Cuadro Principal · Primera Categoría</p>
            </div>

            <div className="tournament-club-brand">
              <img src="/logo.webp" alt="Logo Club Tenis" className="tournament-club-logo" />
              <div className="tournament-club-info">
                <strong>Club Tenis</strong>
                <span>Organización Oficial</span>
              </div>
            </div>
          </div>

          <div className="tournament-meta-bar">
            <div className="meta-item">
              <MapPin size={16} color="var(--accent-hover)" />
              <span>{tournament.surface}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} color="var(--accent-hover)" />
              <span>{tournament.dates}</span>
            </div>
            <div className="meta-item">
              <Users size={16} color="var(--accent-hover)" />
              <span>16 Jugadores Clasificados</span>
            </div>
            <div className="meta-item">
              <Trophy size={16} color="#F59E0B" />
              <span>Campeón: 2,000 PTS ATP-Club</span>
            </div>
          </div>

          {/* Categoría y Barra de Búsqueda */}
          <div className="tournament-controls">
            <div className="category-tabs">
              <button className="category-tab active">
                Primera Categoría
              </button>
            </div>

            <div className="tournament-actions">
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Buscar jugador..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="zoom-controls">
                <button onClick={handleZoomOut} title="Alejar" className="zoom-btn"><ZoomOut size={16} /></button>
                <button onClick={handleResetZoom} title="Tamaño original" className="zoom-btn"><RotateCcw size={14} /></button>
                <button onClick={handleZoomIn} title="Acercar" className="zoom-btn"><ZoomIn size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de Deslizamiento en Celulares */}
        <div className="mobile-scroll-indicator">
          <span>👈 Desliza horizontalmente para ver todo el cuadro de llaves 👉</span>
        </div>

        {/* Cuadro de Llaves (Bracket Tree) */}
        <div className="bracket-scroll-container">
          <div className="bracket-wrapper" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
            
            {/* Rondas (Octavos, Cuartos, Semis, Final) */}
            {tournament.rounds.map((round) => (
              <div key={round.id} className={`bracket-round round-${round.id}`}>
                {/* Cabecera de la ronda */}
                <div className="round-header">
                  <span className="round-title">{round.name}</span>
                  <span className="round-points">{round.points}</span>
                </div>

                {/* Lista de partidos de la ronda */}
                <div className="round-matches">
                  {round.matches.map((match) => (
                    <div 
                      key={match.id} 
                      className={`match-card ${isEditMode ? 'editable-card' : ''} ${activeMatch?.id === match.id ? 'selected' : ''}`}
                      onClick={() => handleMatchClick(match)}
                      title={isEditMode ? 'Haz clic para editar los jugadores o resultado' : 'Haz clic para ver detalles'}
                    >
                      {isEditMode && (
                        <div className="match-edit-badge">
                          <Edit3 size={11} /> Editar
                        </div>
                      )}

                      {/* Jugador 1 */}
                      <div className={`player-row ${match.player1.isWinner ? 'winner' : ''} ${isPlayerHighlighted(match.player1.name) ? 'search-highlight' : ''}`}>
                        <div className="player-meta">
                          <span className="player-name" title={match.player1.name}>
                            {match.player1.name}
                          </span>
                        </div>
                        {renderSetsBoxes(match.player1, match.player2)}
                      </div>

                      <div className="match-divider"></div>

                      {/* Jugador 2 */}
                      <div className={`player-row ${match.player2.isWinner ? 'winner' : ''} ${isPlayerHighlighted(match.player2.name) ? 'search-highlight' : ''}`}>
                        <div className="player-meta">
                          <span className="player-name" title={match.player2.name}>
                            {match.player2.name}
                          </span>
                        </div>
                        {renderSetsBoxes(match.player2, match.player1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Tarjeta del Campeón */}
            <div className="bracket-champion-column">
              <div className="round-header champion-header">
                <span className="round-title">CAMPEÓN</span>
                <span className="round-points">{tournament.champion.points}</span>
              </div>

              <div className="champion-card-wrapper">
                <div className="champion-card">
                  {isEditMode && (
                    <button 
                      className="btn-edit-champion-pill" 
                      onClick={handleOpenEditChampion}
                    >
                      <Edit3 size={12} /> Editar Campeón
                    </button>
                  )}

                  <div className="champion-badge-glow">
                    <Trophy size={48} className="trophy-gold" />
                  </div>
                  
                  <span className="champion-label">CAMPEÓN</span>
                  <h2 className="champion-name">{tournament.champion.name}</h2>
                  <div className="champion-points-tag">{tournament.champion.points}</div>

                  <div className="champion-details">
                    <div className="champion-detail-item">
                      <span>Resultado Final:</span>
                      <strong>{tournament.champion.sets}</strong>
                    </div>
                    <div className="champion-detail-item">
                      <span>Subcampeón:</span>
                      <strong>{tournament.champion.runnerUp} ({tournament.champion.runnerUpPoints})</strong>
                    </div>
                  </div>

                  <div className="champion-watermark">
                    <img src="/logo.webp" alt="Club Tenis" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal: Editar Partido (Solo para Admin en Modo Edición) */}
        {activeMatch && isEditMode && editingMatchData && (
          <div className="match-modal-backdrop" onClick={() => setActiveMatch(null)}>
            <div className="match-modal card admin-edit-modal" onClick={(e) => e.stopPropagation()}>
              <div className="match-modal-header">
                <div className="flex items-center gap-2">
                  <Edit3 size={18} color="var(--text-primary)" />
                  <h3 style={{ margin: 0 }}>Editar Partido</h3>
                </div>
                <button className="btn-close" onClick={() => setActiveMatch(null)}>×</button>
              </div>

              <div className="match-modal-body">
                {/* Selector de Tipo de Partido */}
                <div className="modal-score-type-selector">
                  <label className="edit-label">Tipo de Resultado</label>
                  <div className="score-type-tabs">
                    <button 
                      type="button"
                      className={`score-type-tab ${editingMatchData.scoreType === 'sets' ? 'active' : ''}`}
                      onClick={() => setEditingMatchData({ ...editingMatchData, scoreType: 'sets' })}
                    >
                      🎾 Sets Normales
                    </button>
                    <button 
                      type="button"
                      className={`score-type-tab ${editingMatchData.scoreType === 'wo' ? 'active' : ''}`}
                      onClick={() => setEditingMatchData({ ...editingMatchData, scoreType: 'wo' })}
                    >
                      🏳️ W.O. / Abandono
                    </button>
                    <button 
                      type="button"
                      className={`score-type-tab ${editingMatchData.scoreType === 'bye' ? 'active' : ''}`}
                      onClick={() => setEditingMatchData({ ...editingMatchData, scoreType: 'bye' })}
                    >
                      ⏩ Bye (Pase)
                    </button>
                  </div>
                </div>

                {/* Si es por Sets: Selector de 2 o 3 sets */}
                {editingMatchData.scoreType === 'sets' && (
                  <div className="sets-count-selector">
                    <label className="edit-label">Duración del Partido</label>
                    <div className="sets-count-pills">
                      <button 
                        type="button"
                        className={`sets-count-pill ${editingMatchData.setsCount === 2 ? 'active' : ''}`}
                        onClick={() => setEditingMatchData({ ...editingMatchData, setsCount: 2 })}
                      >
                        Partido a 2 Sets (ej: 6-4, 6-3)
                      </button>
                      <button 
                        type="button"
                        className={`sets-count-pill ${editingMatchData.setsCount === 3 ? 'active' : ''}`}
                        onClick={() => setEditingMatchData({ ...editingMatchData, setsCount: 3 })}
                      >
                        Partido a 3 Sets (ej: 6-4, 4-6, 7-5)
                      </button>
                    </div>
                  </div>
                )}

                {/* Tabla simétrica de Jugadores y Sets */}
                {editingMatchData.scoreType === 'sets' && (
                  <div className="sets-table-container">
                    <div className="sets-table-header">
                      <span className="col-name">Nombre del Jugador</span>
                      <span className="col-set">Set 1</span>
                      <span className="col-set">Set 2</span>
                      {editingMatchData.setsCount === 3 && <span className="col-set">Set 3</span>}
                      <span className="col-win">¿Ganador?</span>
                    </div>

                    {/* Fila Jugador 1 */}
                    <div className={`sets-table-row ${editingMatchData.player1.isWinner ? 'winner-row' : ''}`}>
                      <input 
                        type="text" 
                        className="input input-table-name"
                        placeholder="Jugador 1"
                        value={editingMatchData.player1.name}
                        onChange={(e) => setEditingMatchData({
                          ...editingMatchData,
                          player1: { ...editingMatchData.player1, name: e.target.value }
                        })}
                      />
                      <input 
                        type="text" 
                        maxLength="3"
                        className="input input-table-set"
                        placeholder="6"
                        value={editingMatchData.player1.set1}
                        onChange={(e) => setEditingMatchData({
                          ...editingMatchData,
                          player1: { ...editingMatchData.player1, set1: e.target.value }
                        })}
                      />
                      <input 
                        type="text" 
                        maxLength="3"
                        className="input input-table-set"
                        placeholder="4"
                        value={editingMatchData.player1.set2}
                        onChange={(e) => setEditingMatchData({
                          ...editingMatchData,
                          player1: { ...editingMatchData.player1, set2: e.target.value }
                        })}
                      />
                      {editingMatchData.setsCount === 3 && (
                        <input 
                          type="text" 
                          maxLength="3"
                          className="input input-table-set"
                          placeholder="7"
                          value={editingMatchData.player1.set3}
                          onChange={(e) => setEditingMatchData({
                            ...editingMatchData,
                            player1: { ...editingMatchData.player1, set3: e.target.value }
                          })}
                        />
                      )}
                      <label className="radio-table-winner">
                        <input 
                          type="radio" 
                          name="winner-select"
                          checked={editingMatchData.player1.isWinner}
                          onChange={() => setEditingMatchData({
                            ...editingMatchData,
                            player1: { ...editingMatchData.player1, isWinner: true },
                            player2: { ...editingMatchData.player2, isWinner: false }
                          })}
                        />
                        <span className="winner-indicator-badge">Ganó</span>
                      </label>
                    </div>

                    {/* Fila Jugador 2 */}
                    <div className={`sets-table-row ${editingMatchData.player2.isWinner ? 'winner-row' : ''}`}>
                      <input 
                        type="text" 
                        className="input input-table-name"
                        placeholder="Jugador 2"
                        value={editingMatchData.player2.name}
                        onChange={(e) => setEditingMatchData({
                          ...editingMatchData,
                          player2: { ...editingMatchData.player2, name: e.target.value }
                        })}
                      />
                      <input 
                        type="text" 
                        maxLength="3"
                        className="input input-table-set"
                        placeholder="4"
                        value={editingMatchData.player2.set1}
                        onChange={(e) => setEditingMatchData({
                          ...editingMatchData,
                          player2: { ...editingMatchData.player2, set1: e.target.value }
                        })}
                      />
                      <input 
                        type="text" 
                        maxLength="3"
                        className="input input-table-set"
                        placeholder="6"
                        value={editingMatchData.player2.set2}
                        onChange={(e) => setEditingMatchData({
                          ...editingMatchData,
                          player2: { ...editingMatchData.player2, set2: e.target.value }
                        })}
                      />
                      {editingMatchData.setsCount === 3 && (
                        <input 
                          type="text" 
                          maxLength="3"
                          className="input input-table-set"
                          placeholder="5"
                          value={editingMatchData.player2.set3}
                          onChange={(e) => setEditingMatchData({
                            ...editingMatchData,
                            player2: { ...editingMatchData.player2, set3: e.target.value }
                          })}
                        />
                      )}
                      <label className="radio-table-winner">
                        <input 
                          type="radio" 
                          name="winner-select"
                          checked={editingMatchData.player2.isWinner}
                          onChange={() => setEditingMatchData({
                            ...editingMatchData,
                            player2: { ...editingMatchData.player2, isWinner: true },
                            player1: { ...editingMatchData.player1, isWinner: false }
                          })}
                        />
                        <span className="winner-indicator-badge">Ganó</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Si es W.O. */}
                {editingMatchData.scoreType === 'wo' && (
                  <div className="wo-edit-section">
                    <div className="input-group">
                      <label>Jugador 1</label>
                      <input 
                        type="text" 
                        className="input" 
                        value={editingMatchData.player1.name}
                        onChange={(e) => setEditingMatchData({
                          ...editingMatchData,
                          player1: { ...editingMatchData.player1, name: e.target.value }
                        })}
                      />
                    </div>
                    <div className="input-group">
                      <label>Jugador 2</label>
                      <input 
                        type="text" 
                        className="input" 
                        value={editingMatchData.player2.name}
                        onChange={(e) => setEditingMatchData({
                          ...editingMatchData,
                          player2: { ...editingMatchData.player2, name: e.target.value }
                        })}
                      />
                    </div>
                    <label className="edit-label">¿Quién ganó por W.O.?</label>
                    <div className="flex gap-4">
                      <label className="radio-winner">
                        <input 
                          type="radio"
                          name="wo-winner"
                          checked={editingMatchData.player1.isWinner}
                          onChange={() => setEditingMatchData({
                            ...editingMatchData,
                            player1: { ...editingMatchData.player1, isWinner: true },
                            player2: { ...editingMatchData.player2, isWinner: false }
                          })}
                        />
                        <span>Ganó {editingMatchData.player1.name || 'Jugador 1'}</span>
                      </label>
                      <label className="radio-winner">
                        <input 
                          type="radio"
                          name="wo-winner"
                          checked={editingMatchData.player2.isWinner}
                          onChange={() => setEditingMatchData({
                            ...editingMatchData,
                            player2: { ...editingMatchData.player2, isWinner: true },
                            player1: { ...editingMatchData.player1, isWinner: false }
                          })}
                        />
                        <span>Ganó {editingMatchData.player2.name || 'Jugador 2'}</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Si es Bye */}
                {editingMatchData.scoreType === 'bye' && (
                  <div className="input-group">
                    <label>Jugador con Pase Directo</label>
                    <input 
                      type="text" 
                      className="input"
                      value={editingMatchData.player1.name}
                      onChange={(e) => setEditingMatchData({
                        ...editingMatchData,
                        player1: { ...editingMatchData.player1, name: e.target.value, isWinner: true }
                      })}
                    />
                  </div>
                )}

                <div className="edit-meta-section">
                  <div>
                    <label className="edit-label">Cancha</label>
                    <input 
                      type="text"
                      className="input"
                      value={editingMatchData.court || ''}
                      onChange={(e) => setEditingMatchData({ ...editingMatchData, court: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="match-modal-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveMatch(null)}>
                  Cancelar
                </button>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={handleSaveMatchEdit}
                  disabled={saving}
                >
                  <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Partido'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Ver Detalles (Modo Lectura para todos los usuarios) */}
        {activeMatch && (!isAdmin || !isEditMode) && (
          <div className="match-modal-backdrop" onClick={() => setActiveMatch(null)}>
            <div className="match-modal card" onClick={(e) => e.stopPropagation()}>
              <div className="match-modal-header">
                <h3>Detalle del Partido</h3>
                <button className="btn-close" onClick={() => setActiveMatch(null)}>×</button>
              </div>
              <div className="match-modal-body">
                <div className="match-detail-players">
                  <div className={`modal-player ${activeMatch.player1.isWinner ? 'winner-box' : ''}`}>
                    <strong>{activeMatch.player1.name}</strong>
                    <div className="modal-sets-display">
                      {renderSetsBoxes(activeMatch.player1, activeMatch.player2)}
                    </div>
                  </div>
                  <div className="modal-vs">VS</div>
                  <div className={`modal-player ${activeMatch.player2.isWinner ? 'winner-box' : ''}`}>
                    <strong>{activeMatch.player2.name}</strong>
                    <div className="modal-sets-display">
                      {renderSetsBoxes(activeMatch.player2, activeMatch.player1)}
                    </div>
                  </div>
                </div>
                <div className="match-modal-info">
                  <p><strong>Cancha:</strong> {activeMatch.court}</p>
                  <p><strong>Estado:</strong> {activeMatch.status}</p>
                </div>
              </div>
              <div className="match-modal-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveMatch(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Editar Campeón */}
        {isEditingChampion && championFormData && (
          <div className="match-modal-backdrop" onClick={() => setIsEditingChampion(false)}>
            <div className="match-modal card admin-edit-modal" onClick={(e) => e.stopPropagation()}>
              <div className="match-modal-header">
                <div className="flex items-center gap-2">
                  <Trophy size={18} color="#D97706" />
                  <h3 style={{ margin: 0 }}>Editar Campeón del Torneo</h3>
                </div>
                <button className="btn-close" onClick={() => setIsEditingChampion(false)}>×</button>
              </div>

              <div className="match-modal-body">
                <div className="input-group">
                  <label>Nombre del Campeón</label>
                  <input 
                    type="text" 
                    className="input"
                    value={championFormData.name}
                    onChange={(e) => setChampionFormData({ ...championFormData, name: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Puntos Obtenidos</label>
                  <input 
                    type="text" 
                    className="input"
                    value={championFormData.points}
                    onChange={(e) => setChampionFormData({ ...championFormData, points: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Resultado de la Final (ej: 7-5, 3-6, 6-4 en la Final)</label>
                  <input 
                    type="text" 
                    className="input"
                    value={championFormData.sets}
                    onChange={(e) => setChampionFormData({ ...championFormData, sets: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Subcampeón</label>
                  <input 
                    type="text" 
                    className="input"
                    value={championFormData.runnerUp}
                    onChange={(e) => setChampionFormData({ ...championFormData, runnerUp: e.target.value })}
                  />
                </div>
              </div>

              <div className="match-modal-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => setIsEditingChampion(false)}>
                  Cancelar
                </button>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={handleSaveChampion}
                  disabled={saving}
                >
                  <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Campeón'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default TournamentView;
