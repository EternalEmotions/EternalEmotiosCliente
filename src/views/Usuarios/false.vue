<template>

    <v-card
    
      >
        <v-system-bar color="deep-purple darken-3"></v-system-bar>
    
        <v-app-bar
          color="deep-purple accent-4"
          dark
          prominent
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    
          <v-toolbar-title>      <h1 style="text-align: center">
            {{ $t("header.search.caption") }}
          </h1></v-toolbar-title>
    
          <v-spacer></v-spacer>
          <v-btn @click="$i18n.locale = 'es'" style="background-color: red">🇪🇸</v-btn>
        <v-btn @click="$i18n.locale = 'en'" style="background-color: blue"
          >🇨🇦󠁧󠁢󠁥󠁮</v-btn
        >
        </v-app-bar>
    
        <v-navigation-drawer
          v-model="drawer"
          absolute
          bottom
          temporary
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                
               <Vistas></vistas>
    
             </v-list-item>
              
        
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
    
      
        <v-card class="mx-auto" max-="1500">
    
          <div style="background-color: pink;">
           <h1 style="text-align:center">
            {{ $t("header.search.caption2") }}
          </h1> 
        </div>
    
          <v-container class="bg-surface-variant"> 
            <v-btn id="pagadores"  v-model="pagado" variant="success" color="pink" @click="fetchPagos"> Todos</v-btn>
            <v-btn id="pagadores"  v-model="pagado" variant="success" color="pink" @click="fetchPagosFalse"> Solo false</v-btn>
            <v-btn id="pagadores"  v-model="pagado" variant="success" color="yellow" @click="launchQuery"> Solo true</v-btn>
            <router-link to="/AddPagos" >
            <v-btn variant="success" id="pagadores" color="yellow">{{ $t("header.search.button6") }}</v-btn>
            
          </router-link>
         
    
    
    
    
            <v-row no-gutters>
             
              <v-col v-for="item in Pagos" :key="item.id" cols="19" sm="3">
               <!-- <v-col v-for="item in Usuarios" :key="item.id" cols="19" sm="3">-->
                <v-sheet class="pa-2 ma-2">
                  <v-card class="mx-auto" max-width="200" min-height="525">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="200px"
                      cover
                    ></v-img>
                    <v-btn block color="pink">
                    <v-card-title style="font-size: 17px" class="texto"
                        ><b>Nombre:&nbsp; </b> {{ item.name }}</v-card-title
                      >
                    </v-btn>
                    <div>
                      
                
                      <v-card-title style="font-size: 12px" class="texto"
                        ><b>precio: &nbsp; </b> {{ item.price }}</v-card-title  
                      >
                      <v-card-title style="font-size: 12px" class="texto"
                        ><b>total: &nbsp; </b> {{ item.total }}</v-card-title>
                        <v-card-title style="font-size: 12px" 
                        ><b>pagado: &nbsp; </b> {{ item.pagado }}</v-card-title>
                        <v-card-title style="font-size: 12px" 
                        ><b>fecha: &nbsp; </b> {{ item.date }}</v-card-title>
                        <v-card-title style="font-size: 12px" class="texto"
                        ><b>notas: &nbsp; </b> {{ item.notes }}</v-card-title>
                        <v-card-title style="font-size: 12px" class="texto"
                        ><b>usuarios: &nbsp; </b> {{ item.usuarios }}</v-card-title>
                   <!--//Conseguir clikar y que vaya al id-->   
                      <v-btn :item="Pagos" v-on:click="showUsuariosDetails(item.id)" color="yellow" variant="primary">{{ $t("header.search.button5") }} {{ item.id }}</v-btn>
               <v-btn v-if="$store.state.role==='admin'"
               @click="onDeletePagos(item.id)"
                 color="pink" variant="primary"> {{ $t("header.search.button7") }} ,{{ item.id }}</v-btn> 
             
                   
                    </div>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container> 
        </v-card>
      </v-card>
    
      
      </template>
      
      <script>
      
      import { mapState,mapActions } from "vuex";
      import Vistas from '@/components/Especificas/Vistas.vue'
    
      export default {
    
        data() {
          
          return { row:{
             pagado:true,
             pagadoFalse:false,
    
          }
           
           };
        },
        data: () => ({
          drawer: false,
          group: null,
        }),
        watch: {
          group () {
            this.drawer = false
          },
        },
        components: {
        
            Vistas
        
      },
     
        name:'Pagos',
        
        computed: {
          ...mapState(["Pagos"]),
        },
        created() {
          
        },
        methods: {
    
          showUsuariosDetails(item) {
            //enrrutamiento clickando al que pinches
            this.$router.push(`Usuarios/${item}`);
          },
          
          ...mapActions({ deletePagos: 'deletePagos', searchPagos:"searchPagos",fetchPagos:"fetchPagos",fetchPagosFalse:"fetchPagosFalse"}),
          
          onDeletePagos(id) {
                this.deletePagos(id)
              },
    
    
    
           launchQuery() {
          if(this.pagado){
            this.searchPagos (this.pagado);
            return
          }
          this.fetchPagos();
        }, 
           pagado(){}
        },
        launchQueryFalse() {
          if(this.pagadoFalse){
            this.searchPagos (this.pagadoFalse);
            return
          }
          this.fetchPagosFalse();
        }, 
           pagadopagadoFalse(){}
        
    
    
      }; 
      </script>
      
      <style>
    
      #pagadores{
        display: block;
        padding: 0.9rem 1rem;
      width: 200px;
      margin: 0 auto;
      }
      
      </style>