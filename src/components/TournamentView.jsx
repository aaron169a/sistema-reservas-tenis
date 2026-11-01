import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, LogOut, Trophy, Award, Search, ZoomIn, ZoomOut, RotateCcw, Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';
import './TournamentView.css';

const TOURNAMENT_DATA_1RA = {
  id: 'torneo-primavera-2026',
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

const TournamentView = ({ onBack }) => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1ra');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const tournament = TOURNAMENT_DATA_1RA;

  const isPlayerHighlighted = (playerName) => {
    if (!searchTerm.trim()) return false;
    return playerName.toLowerCase().includes(searchTerm.toLowerCase().trim());
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="tournament-layout">
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
          </div>
          <button className="btn btn-secondary btn-sm" onClick={logout}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="tournament-main container">
        {/* Header Banner de Torneo */}
        <div className="tournament-header-card card">
          <div className="tournament-header-top">
            <div className="tournament-title-area">
              <div className="tournament-badge-row">
                <span className="badge badge-season">Temporada 2026</span>
                <span className="badge badge-status">
                  <CheckCircle2 size={13} /> {tournament.status}
                </span>
              </div>
              <h1 className="tournament-title">{tournament.name}</h1>
              <p className="tournament-subtitle">Cuadro Principal de Eliminación Directa</p>
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
              <button 
                className="category-tab active"
                onClick={() => setSelectedCategory('1ra')}
              >
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
            {tournament.rounds.map((round, rIndex) => (
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
                      className={`match-card ${selectedMatch?.id === match.id ? 'selected' : ''}`}
                      onClick={() => setSelectedMatch(match)}
                    >
                      {/* Jugador 1 */}
                      <div className={`player-row ${match.player1.isWinner ? 'winner' : ''} ${isPlayerHighlighted(match.player1.name) ? 'search-highlight' : ''}`}>
                        <div className="player-meta">
                          <span className="player-name" title={match.player1.name}>
                            {match.player1.name}
                          </span>
                          {match.player1.isCurrentUser && (
                            <span className="user-tag">TÚ</span>
                          )}
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
                          {match.player2.isCurrentUser && (
                            <span className="user-tag">TÚ</span>
                          )}
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

        {/* Modal de Detalle de Partido si se hace click */}
        {selectedMatch && (
          <div className="match-modal-backdrop" onClick={() => setSelectedMatch(null)}>
            <div className="match-modal card" onClick={(e) => e.stopPropagation()}>
              <div className="match-modal-header">
                <h3>Detalle del Partido</h3>
                <button className="btn-close" onClick={() => setSelectedMatch(null)}>×</button>
              </div>
              <div className="match-modal-body">
                <div className="match-detail-players">
                  <div className={`modal-player ${selectedMatch.player1.isWinner ? 'winner-box' : ''}`}>
                    <strong>{selectedMatch.player1.name}</strong>
                    <span className="modal-score">{selectedMatch.player1.score || '—'}</span>
                  </div>
                  <div className="modal-vs">VS</div>
                  <div className={`modal-player ${selectedMatch.player2.isWinner ? 'winner-box' : ''}`}>
                    <strong>{selectedMatch.player2.name}</strong>
                    <span className="modal-score">{selectedMatch.player2.score || '—'}</span>
                  </div>
                </div>
                <div className="match-modal-info">
                  <p><strong>Cancha:</strong> {selectedMatch.court}</p>
                  <p><strong>Estado:</strong> {selectedMatch.status}</p>
                </div>
              </div>
              <div className="match-modal-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedMatch(null)}>
                  Cerrar
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
