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
    sets: '7-5 en la Final',
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
          player1: { name: 'Jugador 1', score: 'Bye', isWinner: true },
          player2: { name: 'Jugador 2', score: '', isWinner: false },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm2',
          player1: { name: 'Jugador 3', score: '6-0', isWinner: true },
          player2: { name: 'Jugador 4', score: '', isWinner: false },
          court: 'Cancha 1',
          status: 'Finalizado'
        },
        {
          id: 'm3',
          player1: { name: 'Jugador 5', score: 'W.O.', isWinner: false },
          player2: { name: 'Jugador 6', score: 'W.O.', isWinner: true },
          court: 'Cancha 2',
          status: 'Finalizado'
        },
        {
          id: 'm4',
          player1: { name: 'Jugador 7', score: '', isWinner: false },
          player2: { name: 'Jugador 8', score: '6-0', isWinner: true },
          court: 'Cancha 3',
          status: 'Finalizado'
        },
        {
          id: 'm5',
          player1: { name: 'Jugador 9', score: '', isWinner: false },
          player2: { name: 'Jugador 10', score: '6-0', isWinner: true },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm6',
          player1: { name: 'Jugador 11', score: '6-3', isWinner: true },
          player2: { name: 'Jugador 12', score: '', isWinner: false },
          court: 'Cancha 1',
          status: 'Finalizado'
        },
        {
          id: 'm7',
          player1: { name: 'Jugador 13', score: '6-2', isWinner: true },
          player2: { name: 'Jugador 14', score: '', isWinner: false },
          court: 'Cancha 2',
          status: 'Finalizado'
        },
        {
          id: 'm8',
          player1: { name: 'Jugador 15', score: '6-0', isWinner: true },
          player2: { name: 'Jugador 16', score: '', isWinner: false },
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
          player1: { name: 'Jugador 1', score: '6-3', isWinner: true },
          player2: { name: 'Jugador 3', score: '', isWinner: false },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm10',
          player1: { name: 'Jugador 6', score: '—', isWinner: false },
          player2: { name: 'Jugador 8', score: '6-0', isWinner: true },
          court: 'Cancha 1',
          status: 'Finalizado'
        },
        {
          id: 'm11',
          player1: { name: 'Jugador 10', score: '6-0', isWinner: true },
          player2: { name: 'Jugador 11', score: '', isWinner: false },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm12',
          player1: { name: 'Jugador 13', score: '6-1', isWinner: true },
          player2: { name: 'Jugador 15', score: '', isWinner: false },
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
          player1: { name: 'Jugador 1', score: '6-2', isWinner: true },
          player2: { name: 'Jugador 8', score: '', isWinner: false },
          court: 'Cancha Principal',
          status: 'Finalizado'
        },
        {
          id: 'm14',
          player1: { name: 'Jugador 10', score: '', isWinner: false },
          player2: { name: 'Jugador 13', score: '6-1', isWinner: true },
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
          player1: { name: 'Jugador 1', score: '', isWinner: false },
          player2: { name: 'Jugador 13', score: '7-5', isWinner: true },
          court: 'Cancha Principal',
          status: 'Finalizado'
        }
      ]
    }
  ]
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
      setEditingMatchData(JSON.parse(JSON.stringify(match)));
    }
  };

  // Guardar cambios de un partido
  const handleSaveMatchEdit = async () => {
    if (!editingMatchData) return;

    const updatedRounds = tournament.rounds.map((round) => ({
      ...round,
      matches: round.matches.map((m) => (m.id === editingMatchData.id ? editingMatchData : m))
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
      showNotification('¡Partido actualizado y guardado con éxito!');
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
                <p>Tienes permisos de Administrador para modificar los jugadores y resultados de este torneo.</p>
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
                        {match.player1.score && (
                          <span className={`score-badge ${match.player1.isWinner ? 'score-winner' : ''}`}>
                            {match.player1.score}
                          </span>
                        )}
                      </div>

                      <div className="match-divider"></div>

                      {/* Jugador 2 */}
                      <div className={`player-row ${match.player2.isWinner ? 'winner' : ''} ${isPlayerHighlighted(match.player2.name) ? 'search-highlight' : ''}`}>
                        <div className="player-meta">
                          <span className="player-name" title={match.player2.name}>
                            {match.player2.name}
                          </span>
                        </div>
                        {match.player2.score && (
                          <span className={`score-badge ${match.player2.isWinner ? 'score-winner' : ''}`}>
                            {match.player2.score}
                          </span>
                        )}
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
                {/* Jugador 1 */}
                <div className="edit-player-section">
                  <label className="edit-label">Jugador 1</label>
                  <div className="edit-row">
                    <input 
                      type="text" 
                      className="input edit-input"
                      placeholder="Nombre del Jugador 1"
                      value={editingMatchData.player1.name}
                      onChange={(e) => setEditingMatchData({
                        ...editingMatchData,
                        player1: { ...editingMatchData.player1, name: e.target.value }
                      })}
                    />
                    <input 
                      type="text" 
                      className="input edit-score-input"
                      placeholder="Score (ej: 6-2)"
                      value={editingMatchData.player1.score}
                      onChange={(e) => setEditingMatchData({
                        ...editingMatchData,
                        player1: { ...editingMatchData.player1, score: e.target.value }
                      })}
                    />
                  </div>
                  <label className="checkbox-winner-label">
                    <input 
                      type="checkbox"
                      checked={editingMatchData.player1.isWinner}
                      onChange={(e) => setEditingMatchData({
                        ...editingMatchData,
                        player1: { ...editingMatchData.player1, isWinner: e.target.checked },
                        player2: { ...editingMatchData.player2, isWinner: !e.target.checked }
                      })}
                    />
                    <span>¿Ganador del partido?</span>
                  </label>
                </div>

                <div className="edit-divider-text">VS</div>

                {/* Jugador 2 */}
                <div className="edit-player-section">
                  <label className="edit-label">Jugador 2</label>
                  <div className="edit-row">
                    <input 
                      type="text" 
                      className="input edit-input"
                      placeholder="Nombre del Jugador 2"
                      value={editingMatchData.player2.name}
                      onChange={(e) => setEditingMatchData({
                        ...editingMatchData,
                        player2: { ...editingMatchData.player2, name: e.target.value }
                      })}
                    />
                    <input 
                      type="text" 
                      className="input edit-score-input"
                      placeholder="Score"
                      value={editingMatchData.player2.score}
                      onChange={(e) => setEditingMatchData({
                        ...editingMatchData,
                        player2: { ...editingMatchData.player2, score: e.target.value }
                      })}
                    />
                  </div>
                  <label className="checkbox-winner-label">
                    <input 
                      type="checkbox"
                      checked={editingMatchData.player2.isWinner}
                      onChange={(e) => setEditingMatchData({
                        ...editingMatchData,
                        player2: { ...editingMatchData.player2, isWinner: e.target.checked },
                        player1: { ...editingMatchData.player1, isWinner: !e.target.checked }
                      })}
                    />
                    <span>¿Ganador del partido?</span>
                  </label>
                </div>

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
                    <span className="modal-score">{activeMatch.player1.score || '—'}</span>
                  </div>
                  <div className="modal-vs">VS</div>
                  <div className={`modal-player ${activeMatch.player2.isWinner ? 'winner-box' : ''}`}>
                    <strong>{activeMatch.player2.name}</strong>
                    <span className="modal-score">{activeMatch.player2.score || '—'}</span>
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
                  <label>Resultado de la Final (ej: 7-5 en la Final)</label>
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
