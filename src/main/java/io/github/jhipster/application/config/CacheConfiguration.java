package io.github.jhipster.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Miembros.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Miembros.class.getName() + ".entradaMiembros", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Miembros.class.getName() + ".invitados", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Miembros.class.getName() + ".reservas", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.PerfilMiembro.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EntradaMiembros.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Invitados.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Invitados.class.getName() + ".entradaInvitados", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EntradaInvitados.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sedes.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sedes.class.getName() + ".hostSedes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EspacioLibre.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.HostSede.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Reservas.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Reservas.class.getName() + ".entradaInvitados", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Reservas.class.getName() + ".registroCompras", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EspaciosReserva.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.RegistroCompra.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Facturacion.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Facturacion.class.getName() + ".registroCompras", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Facturacion.class.getName() + ".cuentaAsociadas", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Facturacion.class.getName() + ".beneficios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EquipoEmpresas.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EquipoEmpresas.class.getName() + ".landings", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.CuentaAsociada.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Beneficio.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.PerfilEquipoEmpresa.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.PerfilEquipoEmpresa.class.getName() + ".productosServicios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Empresa.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Landing.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Landing.class.getName() + ".tarifaLandings", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.TarifaLanding.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ProductosServicios.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Pais.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Pais.class.getName() + ".ciudads", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ciudad.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
